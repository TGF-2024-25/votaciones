<template>
  <div>
    <h1>Pruebas de Candidaturas</h1>
    <button @click="probarCreacion">Probar Creación</button>
    <button @click="probarActualizacion">Probar Actualización</button>
    <button @click="probarBorrado">Probar Borrado</button>
    <button @click="probarBusqueda">Probar Búsqueda</button>
    <button @click="probarConsulta">Probar Consulta</button>
  </div>
</template>

<script>
import {
  testCreateCandidacy,
  testUpdateCandidacy,
  testDeleteCandidacy,
  testSearchCandidacy,
  testConsultCandidacy,
} from '../test/testCandidacy.js';

export default {
  methods: {
    async probarCreacion() {
      await testCreateCandidacy();
    },
    async probarActualizacion() {
      await testUpdateCandidacy();
    },
    async probarBorrado() {
      await testDeleteCandidacy();
    },
    async probarBusqueda() {
      await testSearchCandidacy();
    },
    async probarConsulta() {
      await testConsultCandidacy();
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
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2c7a64;
}
</style>
