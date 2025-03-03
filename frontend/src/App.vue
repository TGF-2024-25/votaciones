<template>
  <div>
    <h1>Pruebas de Usuario</h1>
    <button @click="probarRegistro">Probar Registro</button>
    <button @click="probarLogin">Probar Login</button>
    <button @click="probarLogout">Probar Logout</button>
  </div>
</template>

<script>
import { testRegister, testLogin, testLogout } from './main.js';

export default {
  methods: {
    async probarRegistro() {
      await testRegister();
    },
    async probarLogin() {
      await testLogin();
    },
    async probarLogout() {
      await testLogout();
    },
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
button {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
