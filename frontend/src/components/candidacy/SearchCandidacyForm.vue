<template>
  <div class="form-container">
    <h3 class="text-center mb-4">Buscar candidaturas</h3>

    <!-- Mensaje de error -->
    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>

    <!-- Formulario de búsqueda -->
    <form @submit.prevent="buscarCandidaturas">
      <div class="mb-3">
        <label for="nombre" class="form-label text-bold">Nombre del candidato</label>
        <input type="text" id="nombre" v-model="filtros.nombre" class="form-control input-custom" maxlength="50">
      </div>

      <div class="mb-3">
        <label for="apellido" class="form-label text-bold">Apellido del candidato</label>
        <input type="text" id="apellido" v-model="filtros.apellido" class="form-control input-custom" maxlength="50">
      </div>

      <div class="mb-3">
        <label for="correo" class="form-label text-bold">Correo electrónico</label>
        <input type="email" id="correo" v-model="filtros.correo" class="form-control input-custom">
      </div>

      <div class="mb-3">
        <label for="eslogan" class="form-label text-bold">Eslogan</label>
        <input type="text" id="eslogan" v-model="filtros.eslogan" class="form-control input-custom" maxlength="50">
      </div>

      <!-- Botones -->
      <div class="mt-4">
        <button type="submit" class="btn btn-warning btn-lg w-100 mb-2">Buscar</button>
        <button type="button" class="btn btn-danger btn-lg w-100" @click="$emit('close')">Cancelar</button>
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

        if (Array.isArray(response.data) && response.data.length === 0) {
          this.errorMessage = "No se encontraron candidaturas con estos filtros.";
        } else {
          this.resultados = response.data;
          this.$router.push({path: '/list-candidacies'});
        }
      } catch (error) {
        this.errorMessage = "Error al buscar candidaturas. Inténtalo de nuevo.";
          this.$router.push({path: '/list-candidacies'});
      }
    }
  },
};
</script>

<style>
@import '../../styles/form.css';
</style>