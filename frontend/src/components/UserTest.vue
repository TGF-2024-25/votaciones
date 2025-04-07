<template>
  <div>
    <h1>Pruebas de Usuario</h1>
    <button @click="probarRegistro">Probar Registro</button>
    <button @click="probarLogin">Probar Login</button>
    <button @click="probarLogout">Probar Logout</button>
    <button @click="probarUpdate">Probar Update</button>
    <button @click="probarBorrado">Probar Borrado</button>
    <button @click="probarBusqueda">Probar Busqueda</button>
    <button @click="probarConsulta">Probar Consulta</button>
    <input type="file" @change="handleFileChange" />
    <button @click="probarSubidaArchivo">Subir Archivo</button>
  </div>
</template>

<script>
import { testRegister, testLogin, testLogout, testUpdate, testDelete, testSearch, testConsult, testUploadFile} from '../test/testUser.js';

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
    async probarUpdate() {
      await testUpdate();
    },
    async probarBorrado() {
      await testDelete();
    },
    async probarBusqueda() {
      await testSearch();
    },
    async probarConsulta() {
      await testConsult();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]; // Guardar el archivo seleccionado
    },
    async probarSubidaArchivo() {
      if (this.selectedFile) {
        await testUploadFile(this.selectedFile); // Llamar a la función de subida
      } else {
        console.error('❌ No se ha seleccionado ningún archivo.');
      }
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
