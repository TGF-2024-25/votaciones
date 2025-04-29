<template>
    <div class="form-container">
      <h3 class="text-center mb-4">Buscar elecciones</h3>
  
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>
  
      <!-- Formulario de búsqueda -->
      <form @submit.prevent="buscarElecciones">
        <div class="mb-3">
          <label for="id" class="form-label text-bold">ID de la elección</label>
          <input type="text" id="id" v-model="filtros.id" class="form-control input-custom" maxlength="24">
        </div>
  
        <div class="mb-3">
          <label for="titulo" class="form-label text-bold">Título de la elección</label>
          <input type="text" id="titulo" v-model="filtros.titulo" class="form-control input-custom" maxlength="100">
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
          id: "",
          titulo: "",
        },
        resultados: [],
        errorMessage: "",
      };
    },
    methods: {
      async buscarElecciones() {
        this.errorMessage = "";
        try {
          const response = await axios.post(`${API_URL}elections/search`, {
            id: this.filtros.id,
            title: this.filtros.titulo,
          });
          //console.log("response:", response.data);
          if (Array.isArray(response.data) && response.data.length === 0) {
            this.errorMessage = "No se encontraron elecciones con estos filtros.";
          } else {
            this.resultados = response.data.elections;
            localStorage.setItem('eleccionesEncontradas', JSON.stringify(this.resultados));
            this.$router.push({ path: '/list-elections' });
          }
        } catch (error) {
          this.errorMessage = "Error al buscar elecciones. Inténtalo de nuevo.";
        }
      }
    },
  };
  </script>
  
  <style>
  @import '../../styles/form.css';
  </style>
  