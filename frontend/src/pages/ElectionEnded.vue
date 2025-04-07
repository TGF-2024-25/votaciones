<template>
    <div class="election-ended-container">
      <!-- Header con botón de retroceso -->
      <div class="page-header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Resultados Finales</h1>
      </div>
  
      <!-- Tarjeta de información principal -->
      <div class="election-card">
        <div class="election-header">
          <h2>{{ election.title }}</h2>
          <div class="election-status ended">FINALIZADA</div>
        </div>
  
        <!-- Fechas -->
        <div class="election-dates">
          <div class="date-item">
            <i class="fas fa-calendar-day"></i>
            <span>Inicio: {{ formatDate(election.voteInitialDate) }}</span>
          </div>
          <div class="date-item">
            <i class="fas fa-calendar-times"></i>
            <span>Fin: {{ formatDate(election.voteFinalDate) }}</span>
          </div>
        </div>
  
        <!-- Resultados principales -->
        <div class="results-section">
          <h3>Ganadores</h3>
          
          <!-- Primer lugar -->
          <div class="winner-card first-place">
            <div class="winner-badge">🥇</div>
            <div class="winner-info">
              <h4>{{ winners[0]?.user || 'No disponible' }}</h4>
              <p class="slogan">{{ winners[0]?.slogan || '' }}</p>
              <div class="vote-count">
                <i class="fas fa-vote-yea"></i>
                {{ winners[0]?.votes || 0 }} votos
                <span class="percentage">({{ calculatePercentage(winners[0]?.votes) }}%)</span>
              </div>
            </div>
          </div>
  
          <!-- Segundo lugar (si existe) -->
          <div v-if="winners.length > 1" class="winner-card second-place">
            <div class="winner-badge">🥈</div>
            <div class="winner-info">
              <h4>{{ winners[1].user }}</h4>
              <p class="slogan">{{ winners[1].slogan }}</p>
              <div class="vote-count">
                <i class="fas fa-vote-yea"></i>
                {{ winners[1].votes }} votos
                <span class="percentage">({{ calculatePercentage(winners[1].votes) }}%)</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Lista completa de resultados -->
        <div class="full-results">
          <h3>Resultados Completos</h3>
          <div class="results-list">
            <div v-for="(candidate, index) in candidates" :key="candidate.id" class="result-item">
              <div class="position">{{ index + 1 }}º</div>
              <div class="candidate-info">
                <h4>{{ candidate.user }}</h4>
                <p class="slogan">{{ candidate.slogan }}</p>
              </div>
              <div class="vote-count">
                {{ candidate.votes }} votos
                <span class="percentage">{{ calculatePercentage(candidate.votes) }}%</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Estadísticas adicionales -->
        <div class="stats-section">
          <div class="stat-card">
            <i class="fas fa-users"></i>
            <div>
              <h4>Participación</h4>
              <p>{{ totalVoters }} votantes</p>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-percentage"></i>
            <div>
              <h4>Abstención</h4>
              <p>{{ abstentionRate }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { API_URL } from '../utils/config'
  
  export default {
    name: 'ElectionEnded',
    data() {
      return {
        election: {
          title: '',
          voteInitialDate: null,
          voteFinalDate: null
        },
        candidates: [],
        totalVotes: 0,
        totalVoters: 0
      }
    },
    computed: {
      winners() {
        return [...this.candidates].sort((a, b) => b.votes - a.votes).slice(0, 2)
      },
      abstentionRate() {
        return this.totalVoters > 0 
          ? Math.round(((this.totalVoters - this.totalVotes) / this.totalVoters) * 100)
          : 0
      }
    },
    async created() {
      await this.loadElectionData()
      await this.loadResults()
    },
    methods: {
      async loadElectionData() {
        try {
          const response = await fetch(`${API_URL}elections/${this.$route.params.id}`)
          this.election = await response.json()
        } catch (error) {
          console.error('Error loading election:', error)
          this.$router.push('/error')
        }
      },
      async loadResults() {
        try {
          const response = await fetch(`${API_URL}elections/${this.$route.params.id}/results`)
          const data = await response.json()
          this.candidates = data.candidates
          this.totalVotes = data.totalVotes
          this.totalVoters = data.totalVoters
        } catch (error) {
          console.error('Error loading results:', error)
        }
      },
      formatDate(dateString) {
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit', 
          minute: '2-digit'
        }
        return new Date(dateString).toLocaleDateString('es-ES', options)
      },
      calculatePercentage(votes) {
        return this.totalVotes > 0 ? Math.round((votes / this.totalVotes) * 100) : 0
      },
      goBack() {
        this.$router.push({ name: "home" });
      }
    }
  }
  </script>
  
  <style scoped>
  .election-ended-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
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
    margin: 0 0 0 15px;
    font-size: 1.8rem;
    color: #2c3e50;
  }
  
  .election-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .election-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .election-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }
  
  .election-status {
    padding: 5px 12px;
    border-radius: 20px
  }
</style>