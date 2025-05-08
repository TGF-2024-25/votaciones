<template>
  <div class="settings-container">
    <h1>Ajustes de Usuario</h1>
    <form @submit.prevent="guardarAjustes">
      <!-- Selección de Tema -->
      <div class="form-group">
        <label for="theme">Tema</label>
        <select v-model="theme" id="theme" class="form-control">
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>

      <!-- Imagen de Perfil -->
      <div class="form-group">
        <label for="profileImage">Foto de Perfil</label>
        <div class="profile-image-container">
          <img v-if="profileImagePreview" :src="profileImagePreview" alt="Foto de perfil" class="profile-image" />
          <p v-else>No hay imagen de perfil</p>
        </div>
        <input type="file" id="profileImage" @change="handleImageUpload" class="form-control" accept="image/jpeg, image/png" />
      </div>

      <button type="submit" class="btn btn-primary mt-4">Aplicar</button>
    </form>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import jwtEncode from 'jwt-encode';

export default {
  data() {
    return {
      theme: 'light', // Valor predeterminado
      profileImage: null, // Archivo de la imagen de perfil
      profileImagePreview: null, // Vista previa de la imagen de perfil
      userId: null, // ID del usuario logueado
    };
  },
  methods: {
    cargarAjustes() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.preferences) {
            this.theme = decoded.preferences.theme || 'light'; // Establecer el tema desde preferences
          }
          if (decoded.user) {
            this.profileImagePreview = decoded.user.image || null; // Cargar la imagen de perfil desde user
            this.userId = decoded.user.email; // Obtener el ID del usuario
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
        this.profileImage = file;

        // Generar vista previa de la imagen
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('El archivo debe ser una imagen .jpeg, .jpg o .png y no superar los 5MB');
        event.target.value = ''; // Limpiar el input
      }
    },
    async guardarAjustes() {
      try {
        // Actualizar el tema en el token
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        if (token) {
          decoded.preferences = { theme: this.theme }; // Actualizar preferencias
        }

        // Subir la imagen al backend si se ha cambiado
        if (this.profileImage) {
          const formData = new FormData();
          formData.append('email', this.userId);
          formData.append('image', this.profileImage);

          const response = await axios.post(`${API_URL}users/updateUser`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Respuesta:', response.data);
          decoded.user.image = response.data.user.image; // Actualizar la imagen en el token
        }
        const newToken = jwtEncode(decoded, import.meta.env.VITE_APP_JWT_SECRET);
        localStorage.setItem('token', newToken); // Guardar el nuevo token

        alert('Ajustes guardados correctamente');
      } catch (error) {
        console.error('Error al guardar los ajustes:', error);
        alert('Error al guardar los ajustes. Inténtalo de nuevo.');
      }
    },
  },
  mounted() {
    this.cargarAjustes(); // Cargar ajustes al montar el componente
  },
};
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.profile-image-container {
  margin-top: 10px;
  text-align: center;
}

.profile-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
</style>