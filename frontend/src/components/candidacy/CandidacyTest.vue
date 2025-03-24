<template>
  <div>
    <h1>Pruebas de Candidaturas</h1>

    <button @click="abrirFormulario()">Probar Creación</button>
    <button @click="probarActualizacion()">Probar Actualización</button>
    <button @click="probarBorrado">Probar Borrado</button>
    <button @click="probarBusqueda()">Probar Búsqueda</button>
    <button @click="probarConsulta">Probar Consulta</button>

    <!-- Formulario de candidatura (crear o editar) -->
    <CandidacyForm 
      v-if="mostrarFormulario" 
      :candidatura="candidaturaParaEditar" 
      @close="cerrarFormulario" 
    />

    <!-- Formulario de búsqueda de candidaturas -->
    <SearchCandidacyForm v-if="mostrarBusqueda" @close="cerrarBusqueda" />
  </div>
</template>

<script>
import CandidacyForm from "./CandidacyForm.vue";
import SearchCandidacyForm from "./SearchCandidacyForm.vue"; 
import {
  testDeleteCandidacy,
  testConsultCandidacy,
} from "../../test/testCandidacy.js";

export default {
  components: {
    CandidacyForm,
    SearchCandidacyForm,
  },
  data() {
    return {
      mostrarFormulario: false,
      mostrarBusqueda: false,
      candidaturaParaEditar: null,
    };
  },
  methods: {
    // Abrir formulario para crear o editar
    abrirFormulario(candidatura = null) {
      this.candidaturaParaEditar = candidatura;
      this.mostrarFormulario = true;
      this.mostrarBusqueda = false; // Cerrar el formulario de búsqueda si está abierto
    },
    cerrarFormulario() {
      this.mostrarFormulario = false;
      this.candidaturaParaEditar = null;
    },
    async probarActualizacion() {
      const candidaturaFake = {
        id: 123,
        slogan: "Eslogan existente",
        text: "Texto de la candidatura existente",
      };
      this.abrirFormulario(candidaturaFake);
    },
    async probarBorrado() {
      await testDeleteCandidacy();
    },
    async probarBusqueda() {
      this.mostrarBusqueda = true;
      this.mostrarFormulario = false; // Cerrar el formulario de alta si está abierto
    },
    cerrarBusqueda() {
      this.mostrarBusqueda = false;
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
