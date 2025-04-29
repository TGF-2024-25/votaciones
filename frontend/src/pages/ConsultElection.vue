<template>
    <div class="election-page">
      <h1>Consultas de Elecciones</h1>
      
      <!-- Componente de Consulta de Elección -->
      <ElectionConsult />
    </div>
  </template>
  
  <script>
  // Importamos el componente ElectionConsult
  import ElectionConsult from '../components/ElectionConsult.vue';
  
  export default {
    components: {
      ElectionConsult
    }
  };
  </script>
  
  <style scoped>
  .election-page {
    padding: 20px;
    background-color: #f1f1f1;
    min-height: 100vh;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 40px;
  }
  </style>
  