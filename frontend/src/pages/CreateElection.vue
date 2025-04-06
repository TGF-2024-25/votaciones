<template>
    <div class="create-election-container">
      <!-- Encabezado con botón de retroceso -->
      <div class="page-header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2 class="page-title">Crear Nueva Elección</h2>
      </div>
  
      <!-- Componente de formulario reutilizable -->
      <ElectionForm 
        :election="electionData" 
        @submit="handleSubmit"
        @cancel="goBack"
      />
    </div>
  </template>
  
  <script>
  import ElectionForm from "../components/election/ElectionForm.vue"
  
  export default {
    name: "CreateElection",
    components: {
      ElectionForm
    },
    data() {
      return {
        electionData: null // Null indica que es una creación nueva
      }
    },
    methods: {
      handleSubmit(election) {
        // Lógica para enviar datos al backend
        console.log("Elección a crear:", election);
        
        // Ejemplo de redirección después de crear
        this.$router.push({ name: "election-list" });
        
        // Aquí deberías llamar a tu API:
        // this.$api.elections.create(election)
        //   .then(() => this.$router.push(...))
        //   .catch(error => showError(error))
      },
      goBack() {
        this.$router.go(-1); // Vuelve a la página anterior
      }
    }
  }
  </script>
  
  <style scoped>
  .create-election-container {
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 15px;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s;
  }
  
  .back-button:hover {
    background: #f0f0f0;
    color: #333;
  }
  
  .page-title {
    margin: 0;
    font-size: 1.5rem;
    align-items: center;
    color: #333;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .create-election-container {
      padding: 15px;
    }
    
    .page-title {
      font-size: 1.3rem;
    }
  }
  </style>