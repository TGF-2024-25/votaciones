<template>
    <div class="vote-container">
      <!-- Encabezado con estado y hora -->
      <div class="header">
        <div class="status-label">Votación</div>
        <div class="status-badge" :class="statusClass">
          {{ electionStatus }}
        </div>
        <div class="time">{{ currentTime }}</div>
        <div class="user-role">{{ userRole }}</div>
      </div>
  
      <!-- Título de la elección -->
      <h1 class="election-title">{{ election.title }}</h1>
  
      <!-- Lista de candidatos en grid -->
      <div class="candidates-grid">
        <div 
          v-for="candidate in candidates" 
          :key="candidate.id"
          class="candidate-card"
        >
          <div class="candidate-media">
            <video v-if="candidate.videoUrl" controls class="candidate-video">
              <source :src="candidate.videoUrl" type="video/mp4">
            </video>
            <div v-else class="no-video-placeholder">
              <i class="fas fa-video-slash"></i>
            </div>
          </div>
          <div class="candidate-details">
            <h3>{{ candidate.user }}</h3>
            <p class="slogan">{{ candidate.slogan }}</p>
            <p class="description">{{ candidate.description }}</p>
          </div>
        </div>
      </div>
  
      <!-- Botón para postularse -->
      <button 
        class="add-candidate-button"
        @click="showAddCandidateModal"
      >
        <i class="fas fa-user-plus"></i> Postularme como Candidato
      </button>
  
      <!-- Fechas de la elección -->
      <div class="date-info">
        <div class="date-item">
          <i class="fas fa-calendar-day"></i>
          <span>Inicio: {{ formatDateTime(election.voteInitialDate) }}</span>
        </div>
        <div class="date-item">
          <i class="fas fa-calendar-times"></i>
          <span>Fin: {{ formatDateTime(election.voteFinalDate) }}</span>
        </div>
      </div>
  
      <!-- Modal para añadir candidatura -->
       <!--
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Postularme como Candidato</h3>
          <form @submit.prevent="submitCandidate">
            <div class="form-group">
              <label>Nombre completo</label>
              <input v-model="newCandidate.user" required>
            </div>
            <div class="form-group">
              <label>Slogan de campaña</label>
              <input v-model="newCandidate.slogan" required>
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea v-model="newCandidate.description" required></textarea>
            </div>
            <div class="form-group">
              <label>Video de presentación (MP4)</label>
              <input 
                type="file" 
                accept="video/mp4"
                @change="handleVideoUpload"
                required
              >
              <small class="hint">Máximo 2 minutos de duración</small>
            </div>
            <div class="modal-actions">
              <button type="button" @click="showModal = false">Cancelar</button>
              <button type="submit">Enviar Candidatura</button>
            </div>
          </form>
        </div>
      </div>-->
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { API_URL } from '../utils/config'
  
  export default {
    props: {
      electionId: {
        type: String,
        required: true
      },
      userRole: {
        type: String,
        default: 'Participante'
      }
    },
    data() {
      return {
        election: {
          title: '',
          voteInitialDate: null,
          voteFinalDate: null
        },
        candidates: [],
        currentTime: '',
        showModal: false,
        newCandidate: {
          user: '',
          slogan: '',
          description: '',
          video: null
        }
      }
    },
    computed: {
      electionStatus() {
        const now = new Date()
        if (now < new Date(this.election.voteInitialDate)) return 'PRÓXIMA'
        if (now > new Date(this.election.voteFinalDate)) return 'FINALIZADA'
        return 'EN CURSO'
      },
      statusClass() {
        return {
          'upcoming': this.electionStatus === 'PRÓXIMA',
          'active': this.electionStatus === 'EN CURSO',
          'ended': this.electionStatus === 'FINALIZADA'
        }
      }
    },
    async created() {
      this.updateCurrentTime()
      await this.loadElectionData()
      await this.loadCandidates()
      setInterval(this.updateCurrentTime, 60000)
    },
    methods: {
      async loadElectionData() {
        try {
          const response = await axios.get(`${API_URL}elections/${this.electionId}`)
          this.election = response.data
        } catch (error) {
          console.error('Error cargando elección:', error)
        }
      },
      async loadCandidates() {
        try {
          const response = await axios.get(`${API_URL}elections/${this.electionId}/candidates`)
          this.candidates = response.data
        } catch (error) {
          console.error('Error cargando candidatos:', error)
        }
      },
      updateCurrentTime() {
        this.currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      formatDateTime(date) {
        const options = { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
        return new Date(date).toLocaleDateString('es-ES', options)
      },
      showAddCandidateModal() {
        this.showModal = true
      },
      handleVideoUpload(event) {
        const file = event.target.files[0]
        if (file) {
          // Validar tipo y tamaño del video
          if (!file.type.includes('video/mp4')) {
            alert('Solo se permiten archivos MP4')
            return
          }
          if (file.size > 50 * 1024 * 1024) { // 50MB
            alert('El video no debe exceder 50MB')
            return
          }
          this.newCandidate.video = file
        }
      },
      async submitCandidate() {
        try {
          const formData = new FormData()
          formData.append('user', this.newCandidate.user)
          formData.append('slogan', this.newCandidate.slogan)
          formData.append('description', this.newCandidate.description)
          formData.append('video', this.newCandidate.video)
  
          const response = await axios.post(
            `${API_URL}elections/${this.electionId}/candidates`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          )
  
          this.candidates.push(response.data)
          this.showModal = false
          this.resetForm()
        } catch (error) {
          console.error('Error enviando candidatura:', error)
          alert('Error al enviar la candidatura')
        }
      },
      resetForm() {
        this.newCandidate = {
          user: '',
          slogan: '',
          description: '',
          video: null
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos generales */
  .vote-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .status-label {
    font-weight: bold;
  }
  
  .status-badge {
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }
  
  .status-badge.upcoming {
    background-color: #FFC107;
  }
  
  .status-badge.active {
    background-color: #4CAF50;
  }
  
  .status-badge.ended {
    background-color: #F44336;
  }
  
  .time, .user-role {
    color: #666;
    font-size: 0.9rem;
  }
  
  .election-title {
    text-align: center;
    margin: 20px 0;
    color: #333;
  }
  
  /* Listado de candidatos */
  .candidates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }
  
  .candidate-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .candidate-media {
    height: 180px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .candidate-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .no-video-placeholder {
    color: #999;
    font-size: 2rem;
  }
  
  .candidate-details {
    padding: 15px;
  }
  
  .candidate-details h3 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  .slogan {
    font-style: italic;
    color: #666;
    margin: 0 0 10px 0;
  }
  
  .description {
    color: #555;
    font-size: 0.9rem;
    margin: 0;
  }
  
  /* Botón de postulación */
  .add-candidate-button {
    display: block;
    width: 100%;
    padding: 12px;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin: 20px 0;
    transition: background 0.3s;
  }
  
  .add-candidate-button:hover {
    background: #0b7dda;
  }
  
  .add-candidate-button i {
    margin-right: 8px;
  }
  
  /* Fechas */
  .date-info {
    background: white;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .date-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  
  .date-item i {
    color: #555;
    width: 20px;
    text-align: center;
  }
  
  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    width: 90%;
    max-width: 500px;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
  
  .modal-content h3 {
    margin-top: 0;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group textarea {
    min-height: 80px;
  }
  
  .hint {
    color: #666;
    font-size: 0.8rem;
    display: block;
    margin-top: 5px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  .modal-actions button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .modal-actions button[type="button"] {
    background: #f5f5f5;
    border: 1px solid #ddd;
  }
  
  .modal-actions button[type="submit"] {
    background: #4CAF50;
    color: white;
    border: none;
  }
  </style>