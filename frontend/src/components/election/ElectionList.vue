<template>
  <div class="election-list-container">
    <!-- Título principal -->
    <h1 class="page-title">
      <i class="fas fa-vote-yea title-icon"></i> Mis Votaciones
    </h1>

    <!-- Lista de elecciones -->
    <div class="elections-grid">
      <div 
        v-for="election in userElections" 
        :key="election.id" 
        class="election-card"
        :class="{ 'active': isElectionActive(election) }"
      >
        <div class="election-header">
          <span class="election-status" :class="getStatusClass(election)">
            {{ getStatusText(election) }}
          </span>
          <span class="election-time">{{ formatTime(election.voteInitialDate) }}</span>
        </div>
        
        <h2 class="election-name">{{ election.title }}</h2>
        
        <div class="election-dates">
          <span>Inicio: {{ formatDate(election.voteInitialDate) }}</span>
          <span>Fin: {{ formatDate(election.voteFinalDate) }}</span>
        </div>

        <button 
          class="vote-button"
          @click.stop="goToVote(election.id)"
          :disabled="!isElectionActive(election)"
        >
          VOTAR
        </button>
      </div>
    </div>

    <!-- Mensaje si no hay elecciones -->
    <div v-if="!isLoading && userElections.length === 0" class="empty-message">
      <i class="fas fa-box-open"></i>
      <p>No tienes votaciones asignadas</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from "../../utils/config";

export default {
  name: 'UserElectionList',
  data() {
    return {
      elections: [],
      isLoading: true,
      currentUser: {} // Añadido currentUser en data
    }
  },
  computed: {
    userElections() {
      return this.elections.filter(election => 
        election.participants?.includes(this.currentUser?.id) || 
        election.creator === this.currentUser?.id
      )
    }
  },
  async created() {
    // Obtener el usuario del store
    this.currentUser = this.$store.state.currentUser || {};
    await this.loadElections()
  },
  methods: {
    async loadElections() {
      try {
        this.isLoading = true
        const response = await axios.get(`${API_URL}elections/user/${this.currentUser.id}`)
        this.elections = response.data
      } catch (error) {
        console.error('Error cargando elecciones:', error)
      } finally {
        this.isLoading = false
      }
    },
    isElectionActive(election) {
      const now = new Date()
      return (
        new Date(election.voteInitialDate) <= now && 
        new Date(election.voteFinalDate) >= now
      )
    },
    getStatusClass(election) {
      const now = new Date()
      if (new Date(election.voteInitialDate) > now) return 'upcoming'
      if (new Date(election.voteFinalDate) < now) return 'ended'
      return 'active'
    },
    getStatusText(election) {
      const status = this.getStatusClass(election)
      return {
        active: 'EN CURSO',
        upcoming: 'PRÓXIMA',
        ended: 'FINALIZADA'
      }[status]
    },
    formatDate(dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return new Date(dateString).toLocaleDateString('es-ES', options)
    },
    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    goToVote(electionId) {
      this.$router.push(`/vote/${electionId}`)
    }
  }
}
</script>

<style scoped>
.election-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  color: #4CAF50;
}

.elections-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.election-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #4CAF50;
  position: relative;
}

.election-card.active {
  border-left-color: #2196F3;
}

.election-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.election-status {
  font-size: 0.75rem;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 12px;
  text-transform: uppercase;
}

.election-status.active {
  background: #E3F2FD;
  color: #0B79D0;
}

.election-status.upcoming {
  background: #FFF8E1;
  color: #FF8F00;
}

.election-status.ended {
  background: #FFEBEE;
  color: #C62828;
}

.election-time {
  color: #666;
  font-size: 0.9rem;
}

.election-name {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.3rem;
}

.election-dates {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #666;
}

.vote-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}

.vote-button:hover {
  background: #3d8b40;
}

.vote-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #666;
}

.empty-message i {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 15px;
  display: block;
}
</style>