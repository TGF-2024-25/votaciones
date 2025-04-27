<template>
    <div class="modify-user-container">
      <h3 class="text-center mb-4">Modificar Usuario</h3>
  
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>
  
      <form @submit.prevent="submitForm">
        <!-- Nombre -->
        <div class="mb-3 d-flex flex-column">
          <label for="nombre" class="form-label text-bold">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="form.nombre"
            class="form-control input-custom"
            maxlength="50"
            required
          />
        </div>
  
        <!-- Apellido -->
        <div class="mb-3 d-flex flex-column">
          <label for="apellido" class="form-label text-bold">Apellido</label>
          <input
            type="text"
            id="apellido"
            v-model="form.apellido"
            class="form-control input-custom"
            maxlength="50"
            required
          />
        </div>
  
        <!-- Correo Electrónico -->
        <div class="mb-3 d-flex flex-column">
          <label for="correo" class="form-label text-bold">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            v-model="form.correo"
            class="form-control input-custom"
            required
          />
        </div>
  
        <!-- Rol -->
        <div class="mb-3 d-flex flex-column">
          <label for="rol" class="form-label text-bold">Rol</label>
          <select id="rol" v-model="form.rol" class="form-control input-custom" required>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
  
        <!-- Botones -->
        <div class="d-flex flex-column align-items-center mt-4 w-100">
          <button type="submit" class="btn btn-warning btn-lg w-100 mb-2">
            Guardar Cambios
          </button>
          <button type="button" class="btn btn-danger btn-lg w-100" @click="goBack">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { API_URL } from "../../utils/config";
  
  export default {
    data() {
      return {
        form: {
          nombre: "",
          apellido: "",
          correo: "",
          rol: "user", // Valor predeterminado
        },
        errorMessage: "",
      };
    },
    methods: {
      goBack() {
        this.$router.back(); // Regresar a la página anterior
      },
      async fetchUser() {
        const userId = this.$route.query.id; // Obtener el ID del usuario desde la query string
        try {
          const response = await axios.post(`${API_URL}users/consultUser`, {
            email: userId,
          });
          const user = response.data.user;
          this.form.nombre = user.name || "";
          this.form.apellido = user.surname || "";
          this.form.correo = user.email || "";
          this.form.rol = user.type || "user";
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          this.errorMessage = "Error al cargar los datos del usuario.";
        }
      },
      async submitForm() {
        this.errorMessage = "";
        try {
          const response = await axios.post(`${API_URL}users/updateUser`, {
            id: this.$route.query.id,
            name: this.form.nombre,
            surname: this.form.apellido,
            email: this.form.correo,
            type: this.form.rol,
          });
          console.log("✅ Usuario actualizado con éxito:", response.data);
          alert("Usuario actualizado correctamente.");
          this.$router.push("/"); // Redirigir a la lista de usuarios
        } catch (error) {
          console.error("❌ Error al actualizar el usuario:", error.response?.data || error.message);
          this.errorMessage = "Error al actualizar el usuario. Inténtalo de nuevo.";
        }
      },
    },
    mounted() {
      this.fetchUser(); // Cargar los datos del usuario al montar el componente
    },
  };
  </script>
  
  <style scoped>
  .modify-user-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .input-custom {
    padding: 10px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>