<template>
    <div>
      <h1>Pruebas para Elecciones</h1>
      <button @click="probarCreate">Crear Elección</button>
      <button @click="probarUpdate">Actualizar Elección</button>
      <button @click="probarConsult">Consultar Elección</button>
      <button @click="probarDelete">Eliminar Elección</button>
    </div>
  </template>
  
  <script>
  import { testElectionCreate, testElectionUpdate, testElectionConsult, testElectionDelete } from '../test/testElection.js';
  
  export default {
    methods: {
      async probarCreate() {
        await testElectionCreate();
      },
      async probarUpdate() {
        await testElectionUpdate();
      },
      async probarConsult() {
        await testElectionConsult();
      },
      async probarDelete() {
        await testElectionDelete();
      } 
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
  color: white;
  background-color: #42b983;
  border: none;

}
</style>