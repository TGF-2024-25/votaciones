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

      <button 
        class="add-candidate-button"
        @click.stop="addCandidate(election.id)"     //Añadir el candidato desde el FE ?
      >
        <i class="boton-candidato"></i> Postularme como Candidato
      </button>

      <!-- Fechas de inicio y fin -->
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

    </div>
</template>

</script>
  
<style scoped>

.header {
  text-align: center;
  margin-bottom: 24px;
}

.header h1 {
  font-size: 24px;
  margin-bottom: 8px;
  color: #333;
}

.header h2 {
  font-size: 20px;
  color: #555;
}


.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.detail-item strong {
  font-weight: 600;
  color: #444;
}

.boton-candidato {
  text-align: center;
  padding: 12px;
  background-color: #f5f5f5;
  color: #666;
  font-weight: bold;
  border-top: 1px dashed #ccc;
  margin-top: 16px;
}
</style>