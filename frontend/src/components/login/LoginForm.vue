<template>
  <div class="login-container">
    <h1></h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input v-model="email" type="text" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p class="register-link" style="margin-top: 40px;">
      ¿No tienes cuenta? 
      <router-link to="/register">Regístrate aquí</router-link>
    </p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';


  import { API_URL } from "../../utils/config";



  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + 'users/login', {
        email: email.value,
        password: password.value,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);

      console.log('✅ Login exitoso:', response.data);
      router.push('/').then(() => router.go(0));
    } catch (error) {
      console.error('❌ Error en el login:', error.response?.data || error.message);
      errorMessage.value = error.response?.data?.message || 'Error al iniciar sesión';
    }
  };
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.error {
  color: red;
  margin-top: 10px;
}
label {
  font-size: 14px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #3e9bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>