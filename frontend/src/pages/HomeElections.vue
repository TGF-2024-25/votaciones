<template>
    <div class="elections-page">
      <!-- Header con título y acciones -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <i class="fas fa-vote-yea header-icon"></i>
            Mis Elecciones
          </h1>
          <button 
            v-if="user.isAdmin"
            @click="createNewElection"
            class="create-button"
          >
            <i class="fas fa-plus"></i> Nueva Elección
          </button>
        </div>
        <div class="filter-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="{ active: activeTab === tab.value }"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
  
      <!-- Estado de carga -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando elecciones...</p>
      </div>
  
      <!-- Mensaje cuando no hay elecciones -->
      <div v-else-if="filteredElections.length === 0" class="empty-state">
        <i class="fas fa-calendar-times empty-icon"></i>
        <h3>No tienes elecciones {{ getTabText(activeTab) }}</h3>
        <p v-if="activeTab === 'upcoming' && user.isAdmin">
          <button @click="createNewElection" class="text-button">
            Crea una nueva elección
          </button>
          para comenzar
        </p>
      </div>
  
      <!-- Listado de elecciones -->
      <ElectionList
        v-else
        :elections="filteredElections"
        :user-role="user.role"
        @select-election="goToElection"
      />
    </div>
  </template>
  
  <script>
  import ElectionList from '@/components/election/ElectionList.vue'
  
  export default {
    name: 'ElectionsPage',
    components: {
      ElectionList
    },
    data() {
      return {
        isLoading: true,
        elections: [],
        activeTab: 'active',
        user: {}, // Ahora user se inicializa aquí
        tabs: [
          { value: 'active', label: 'Activas' },
          { value: 'upcoming', label: 'Próximas' },
          { value: 'ended', label: 'Finalizadas' }
        ]
      }
    },
    computed: {
      filteredElections() {
        const now = new Date()
        return this.elections.filter(election => {
          const startDate = new Date(election.voteInitialDate)
          const endDate = new Date(election.voteFinalDate)
  
          switch (this.activeTab) {
            case 'active':
              return startDate <= now && endDate >= now
            case 'upcoming':
              return startDate > now
            case 'ended':
              return endDate < now
            default:
              return true
          }
        })
      }
    },
    async created() {
      // Obtener el usuario de donde corresponda (ejemplo: this.$store.state.user)
      this.user = this.$store.state.user || {}; // Asumiendo que está disponible en $store
      await this.loadUserElections()
      this.isLoading = false
    },
    methods: {
      async loadUserElections() {
        try {
          // Aquí debes reemplazar con tu llamada API real
          const response = await this.$api.get(`/users/${this.user.id}/elections`)
          this.elections = response.data
        } catch (error) {
          console.error('Error loading elections:', error)
          this.$toast.error('Error al cargar elecciones')
        }
      },
      getTabText(tab) {
        return {
          active: 'activas',
          upcoming: 'programadas',
          ended: 'finalizadas'
        }[tab]
      },
      createNewElection() {
        if (this.user.isAdmin) {
          // Aquí puedes implementar la lógica para crear una nueva elección
          // Por ejemplo, redirigir a una página de creación
          this.$router.push('/elections/new')
        }
      },
      goToElection(election) {
        const now = new Date()
        const endDate = new Date(election.voteFinalDate)
        
        if (endDate < now) {
          this.$router.push(`/elections/${election.id}/results`)
        } else {
          this.$router.push(`/elections/${election.id}`)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .elections-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .page-header {
    margin-bottom: 30px;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .page-title {
    font-size: 2rem;
    color: #2c3e50;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .header-icon {
    color: #4a89dc;
  }
  
  .create-button {
    background-color: #4a89dc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s;
  }
  
  .create-button:hover {
    background-color: #3a70c2;
  }
  
  .filter-tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .filter-tabs button {
    padding: 12px 20px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .filter-tabs button.active {
    color: #4a89dc;
    border-bottom-color: #4a89dc;
  }
  
  .filter-tabs button:hover {
    color: #3a70c2;
  }
  
  .loading-state {
    text-align: center;
    padding: 50px 0;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #4a89dc;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  .empty-icon {
    font-size: 3rem;
    color: #adb5bd;
    margin-bottom: 15px;
  }
  
  .empty-state h3 {
    color: #555;
    margin-bottom: 10px;
  }
  
  .text-button {
    background: none;
    border: none;
    color: #4a89dc;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
  }
  
  .text-button:hover {
    color: #3a70c2;
  }
  
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    .page-title {
      font-size: 1.6rem;
    }
    
    .filter-tabs {
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 5px;
    }
    
    .filter-tabs button {
      padding: 10px 15px;
    }
  }
  </style>