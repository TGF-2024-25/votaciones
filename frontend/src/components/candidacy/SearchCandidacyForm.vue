<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-lg form-container">
      <h3 class="text-center mb-4">Buscar Candidaturas</h3>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>

      <!-- Formulario de búsqueda -->
      <form @submit.prevent="buscarCandidaturas">
        <div class="mb-3 d-flex flex-column">
          <label for="nombre" class="form-label text-bold">Nombre del candidato</label>
          <input type="text" id="nombre" v-model="filtros.nombre" class="form-control input-custom" maxlength="50">
        </div>

        <div class="mb-3 d-flex flex-column">
          <label for="apellido" class="form-label text-bold">Apellido del candidato</label>
          <input type="text" id="apellido" v-model="filtros.apellido" class="form-control input-custom" maxlength="50">
        </div>

        <div class="mb-3 d-flex flex-column">
          <label for="correo" class="form-label text-bold">Correo electrónico</label>
          <input type="email" id="correo" v-model="filtros.correo" class="form-control input-custom">
        </div>

        <div class="mb-3 d-flex flex-column">
          <label for="eslogan" class="form-label text-bold">Eslogan</label>
          <input type="text" id="eslogan" v-model="filtros.eslogan" class="form-control input-custom" maxlength="50">
        </div>

        <!-- Botones -->
        <div class="d-flex flex-column align-items-center mt-4 w-100">
          <button type="submit" class="btn btn-warning btn-lg w-100 mb-2">Buscar</button>
          <button type="button" class="btn btn-danger btn-lg w-100" @click="resetearBusqueda">Limpiar</button>
        </div>
      </form>
    </div>

    <!-- Resultados de la búsqueda -->
    <div v-if="resultados.length > 0" class="card p-4 mt-4 shadow-lg">
      <h4 class="text-center mb-3">Resultados</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Eslogan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidato in resultados" :key="candidato.id">
            <td>{{ candidato.nombre }}</td>
            <td>{{ candidato.apellido }}</td>
            <td>{{ candidato.correo }}</td>
            <td>{{ candidato.eslogan }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../../utils/config";

export default {
  data() {
    return {
      filtros: {
        nombre: "",
        apellido: "",
        correo: "",
        eslogan: "",
      },
      resultados: [],
      errorMessage: "",
    };
  },
  methods: {
    async buscarCandidaturas() {
      this.errorMessage = "";
      try {
        const response = await axios.post(`${API_URL}candidacies/search`, {
            electionId: '12345', // TODO
            slogan: this.filtros.eslogan,
            name: this.filtros.nombre,
            surname: this.filtros.apellido,
            email: this.filtros.correo,
        });
        this.resultados = response.data;
      } catch (error) {
        this.errorMessage = "Error al buscar candidaturas. Inténtalo de nuevo.";
      }
    },
    resetearBusqueda() {
      this.filtros = { nombre: "", apellido: "", correo: "", eslogan: "" };
      this.resultados = [];
    },
  },
};
</script>

<style scoped>
/* Mismo estilo del formulario de alta */
.form-container {
  background-color: #f8f9fa;
  border-radius: 15px;
  max-width: 450px;
  margin: auto;
}

.alert-danger {
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
}

.input-custom {
  background-color: #e9ecef !important;
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 10px;
}

.text-bold {
  font-weight: bold;
}

.btn-warning {
  background-color: #ffc107;
  border: none;
  border-radius: 10px;
  color: black;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  border-radius: 10px;
}

.btn-danger:hover {
  background-color: #b02a37;
}

h3 {
  text-align: center;
  font-weight: bold;
}

/* Estilos de la tabla */
.table {
  margin-top: 15px;
}

th {
  background-color: #007bff;
  color: white;
  text-align: center;
}

td {
  text-align: center;
}
</style>
