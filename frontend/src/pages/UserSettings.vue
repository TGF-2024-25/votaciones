<template>
    <div class="settings-container">
      <h1>Ajustes de Usuario</h1>
      <form @submit.prevent="guardarAjustes">
        <div class="form-group">
          <label for="theme">Tema</label>
          <select v-model="theme" id="theme" class="form-control">
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Aplicar</button>
      </form>
    </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import jwtEncode from 'jwt-encode';

export default {
  data() {
    return {
      theme: 'light', // Valor predeterminado
    };
  },
  methods: {
    cargarAjustes() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.preferences && decoded.preferences.theme) {
            this.theme = decoded.preferences.theme; // Establecer el tema desde las preferencias
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      }
    },
    guardarAjustes() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          decoded.preferences = { theme: this.theme }; // Actualizar preferencias
          const newToken = jwtEncode(decoded, import.meta.env.VITE_APP_JWT_SECRET);
          localStorage.setItem('token', newToken); // Guardar el nuevo token
          alert('Ajustes guardados correctamente');
        } catch (error) {
          console.error('Error al guardar los ajustes:', error, import.meta.env.VUE_APP_JWT_SECRET);
        }
      }
    }
  },
  mounted() {
    this.cargarAjustes(); // Cargar ajustes al montar el componente
  }
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
</style>