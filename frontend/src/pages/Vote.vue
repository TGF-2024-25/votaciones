<template>
    <div class="vote-page">
      <!-- Header con botón de retroceso -->
      <div class="page-header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2 class="page-title">Participar en Votación</h2>
      </div>
  
      <!-- Componente de votación -->
      <VoteForm 
        :election-id="electionId"
        :voter-hash-id="voterHashId"
        @voted="handleVoted"
      />
  
      <!-- Sección de información -->
      <div class="election-info">
        <h3>{{ election.title }}</h3>
        <div class="dates">
          <p><i class="fas fa-calendar-day"></i> Inicio: {{ formatDate(election.voteInitialDate) }}</p>
          <p><i class="fas fa-calendar-times"></i> Cierre: {{ formatDate(election.voteFinalDate) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VoteForm from "../components/election/VoteForm.vue";
  import { API_URL } from "../utils/config";
  
  export default {
    name: "VotePage",
    components: {
      VoteForm
    },
    data() {
      return {
        electionId: this.$route.params.id,
        voterHashId: "", // Esto deberías obtenerlo del usuario autenticado
        election: {
          title: "",
          voteInitialDate: null,
          voteFinalDate: null
        }
      };
    },
    async created() {
      await this.loadElectionData();
      this.getVoterHash();
    },
    methods: {
      async loadElectionData() {
        try {
          const response = await fetch(`${API_URL}elections/${this.electionId}`);
          this.election = await response.json();
        } catch (error) {
          console.error("Error cargando datos de elección:", error);
          this.$router.push("/error");
        }
      },
      getVoterHash() {
        // Implementa cómo obtienes el hash único del votante
        // Ejemplo: this.voterHashId = localStorage.getItem("voterHash");
        this.voterHashId = "user-hash-123"; // Temporal - reemplazar
      },
      handleVoted() {
        this.$toast.success("¡Voto registrado correctamente!");
        this.$router.push("/elections");
      },
      goBack() {
        this.$router.push({ name: "home" });
      },
      formatDate(dateString) {
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString("es-ES", options);
      }
    }
  };
  </script>
  
  <style scoped>
  .vote-page {
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
    color: #333;
  }
  
  .election-info {
    margin-top: 40px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .election-info h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .dates {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .dates p {
    margin: 0;
    color: #555;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .dates i {
    color: #4a89dc;
  }
  
  @media (max-width: 768px) {
    .vote-page {
      padding: 15px;
    }
    
    .page-title {
      font-size: 1.3rem;
    }
    
    .dates {
      flex-direction: column;
      gap: 8px;
    }
  }
  </style>