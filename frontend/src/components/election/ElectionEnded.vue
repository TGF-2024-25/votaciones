<template>
    <div class="election-results">
      <div class="results-header">
        <h1>{{ electionData.className }}</h1>
        <h2>RESULTADO</h2>
      </div>
  
      <div class="results-details">
        <div class="detail-item">
          <strong>Tipo de Votación</strong>
          <span>{{ electionData.electionType }}</span>
        </div>
  
        <div class="detail-item">
          <strong>Ubicación</strong>
          <span>{{ electionData.location }}</span>
        </div>
  
        <div class="detail-item">
          <strong>Fecha de Inicio</strong>
          <span>{{ formatDateTime(electionData.startDate) }}</span>
        </div>
  
        <div class="detail-item">
          <strong>Fecha de Fin</strong>
          <span>{{ formatDateTime(electionData.endDate) }}</span>
        </div>
  
        <div class="winners-section">
          <div class="winner-item">
            <strong>Ganador</strong>
            <span class="winner-name">{{ electionData.winner || '......' }}</span>
          </div>
  
          <div class="winner-item">
            <strong>2º Ganador</strong>
            <span class="winner-name">{{ electionData.runnerUp || '......' }}</span>
          </div>
        </div>
      </div>
  
      <div class="status-banner">
        FINALIZADA
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      electionData: {
        election: Object,
      }
    },
    methods: {
      formatDateTime(dateString) {
        const date = new Date(dateString)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        
        //return `${hours}:${minutes} ${day}/${month}/${year}`
        return `${day}/${month}/${year}`
      }
    }
  }
  </script>
  
  <style scoped>
  .election-results {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffc107;
  }
  
  .results-header {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .results-header h1 {
    font-size: 24px;
    margin-bottom: 8px;
    color: #333;
  }
  
  .results-header h2 {
    font-size: 20px;
    color: #555;
  }
  
  .results-details {
    margin-bottom: 24px;
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
  
  .winners-section {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 2px solid #ddd;
    background-color: #ffc107;
  }
  
  .winner-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
  
  .winner-name {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .status-banner {
    text-align: center;
    padding: 12px;
    background-color: #f5f5f5;
    color: #666;
    font-weight: bold;
    border-top: 1px dashed #ccc;
    margin-top: 16px;
  }
  </style>