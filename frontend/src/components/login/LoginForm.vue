<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="text" id="email" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
      router.push('/');
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
  height: 100vh;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>