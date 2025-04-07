<template>
    <div class="register-container">
      <h2 class="text-center mb-4">Crear Cuenta</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input v-model="name" type="text" id="name" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="surname">Apellido</label>
          <input v-model="surname" type="text" id="surname" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input v-model="email" type="email" id="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success mt-4">Registrarse</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        surname: "",
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post(import.meta.env.VITE_API_URL + "users/register", {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
          });
          
          // Guardar el token en localStorage
          console.log(response.data.token);
          localStorage.setItem('token', response.data.token);
          
          console.log("✅ Registro exitoso:", response.data);
          this.$router.push("/"); // Redirigir al inicio de sesión después del registro
        } catch (error) {
          console.error("❌ Error en el registro:", error.response?.data || error.message);
          this.errorMessage = error.response?.data?.message || "Error al registrarse";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>