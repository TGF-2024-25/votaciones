<template>
    <div class="vote-container">
      <div class="header">
        <div class="status-label">Votación</div>
        <div class="status-badge" :class="statusClass">
          {{ electionStatus }}
        </div>
        <div class="time">{{ currentTime }}</div>
        <div class="user-role">{{ userRole }}</div>
      </div>
  
      <!-- Título de la votación -->
      <h1 class="election-title">{{ election.title }}</h1>
  
      <!-- Lista de candidatos en 2 columnas -->
      <div class="candidates-grid">
        <div 
          v-for="candidate in candidates" 
          :key="candidate.id"
          class="candidate-card"
          :class="{ 'selected': selectedCandidateId === candidate.id }"
          @click="selectCandidate(candidate.id)"
        >
          {{ candidate.name }}
        </div>
      </div>
  
      <!-- Botones de acción -->
      <div class="action-buttons">
        <button 
          class="vote-button"
          :disabled="!selectedCandidateId || !isElectionActive"
          @click="submitVote"
        >
          VOTAR
        </button>
        <!-- <button 
          class="cancel-button"
          v-if="currentVote && isElectionActive"
          @click="cancelVote"
          Cancelar Voto
        </button>-->
        
      </div>
  
      <!-- Mensajes de estado -->
      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { API_URL } from "../../utils/config";
  
  export default {
    props: {
      electionId: {
        type: String,
        required: true
      },
      voterHashId: {
        type: String,
        required: true
      },
      
    },
    data() {
      return {
        election: {
          title: "",
          voteInitialDate: null,
          voteFinalDate: null
        },
        candidates: [],
        selectedCandidateId: null,
        currentVote: null,
        currentTime: "",
        message: "",
        messageType: ""
      };
    },
    computed: {
      isElectionActive() {
        const now = new Date();
        return (
          new Date(this.election.voteInitialDate) <= now &&
          new Date(this.election.voteFinalDate) >= now
        );
      },
      electionStatus() {
        return this.isElectionActive ? "En curso" : "Finalizada";
      },
      statusClass() {
        return this.isElectionActive ? "active" : "ended";
      }
    },
    async created() {
      this.updateCurrentTime();
      setInterval(this.updateCurrentTime, 60000); // Actualizar cada minuto
      await this.loadElectionData();
      await this.checkExistingVote();
    },
    methods: {
      updateCurrentTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
      async loadElectionData() {
        try {
          const [electionRes, candidatesRes] = await Promise.all([
            axios.get(`${API_URL}elections/${this.electionId}`),
            axios.get(`${API_URL}elections/${this.electionId}/candidates`)
          ]);
          
          this.election = electionRes.data;
          this.candidates = candidatesRes.data;
        } catch (error) {
          this.showMessage("Error al cargar datos de la elección", "error");
        }
      },
      async checkExistingVote() {
        try {
          const response = await axios.get(`${API_URL}elections/${this.electionId}/votes`, {
            params: { voterHashId: this.voterHashId }
          });
          this.currentVote = response.data.vote || null;
          if (this.currentVote) {
            this.selectedCandidateId = this.currentVote.candidateId;
          }
        } catch (error) {
          console.error("Error verificando voto:", error);
        }
      },
      selectCandidate(id) {
        this.selectedCandidateId = id;
      },
      async submitVote() {
        try {
          const response = await axios.post(`${API_URL}elections/${this.electionId}/votes`, {
            candidateId: this.selectedCandidateId,
            voterHashId: this.voterHashId
          });
          this.currentVote = response.data;
          this.showMessage("Voto registrado correctamente", "success");
        } catch (error) {
          this.showMessage(error.response?.data?.message || "Error al votar", "error");
        }
      },
      showMessage(text, type) {
        this.message = text;
        this.messageType = type;
        setTimeout(() => {
          this.message = "";
          this.messageType = "";
        }, 3000);
      }
    }
  };
  </script>
  
  <style scoped>
  .vote-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .status-label {
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .status-badge {
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    color: white;
  }
  
  .status-badge.active {
    background-color: #4CAF50;
  }
  
  .status-badge.ended {
    background-color: #f44336;
  }
  
  .time, .user-role {
    color: #666;
    font-size: 0.9rem;
  }
  
  .election-title {
    text-align: center;
    color: #333;
    margin: 20px 0;
    font-size: 1.5rem;
    word-break: break-word;
  }
  
  .candidates-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .candidate-card {
    padding: 15px;
    background-color: white;
    border: 2px solid #ddd;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .candidate-card:hover {
    border-color: #aaa;
  }
  
  .candidate-card.selected {
    border-color: #2196F3;
    background-color: #e3f2fd;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .vote-button {
    flex: 1;
    padding: 12px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .vote-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .vote-button:not(:disabled):hover {
    background-color: #0b7dda;
  }
  
  .cancel-button {
    flex: 1;
    padding: 12px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #d32f2f;
  }
  
  .message {
    padding: 10px;
    margin-top: 15px;
    border-radius: 5px;
    text-align: center;
  }
  
  .message.success {
    background-color: #dff0d8;
    color: #3c763d;
  }
  
  .message.error {
    background-color: #f2dede;
    color: #a94442;
  }
  
  .message.info {
    background-color: #d9edf7;
    color: #31708f;
  }
  </style>