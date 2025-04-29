<template>
  <div class="election-consult">
    <h1>Consulta de Elección</h1>
    <div v-if="election">
      <h2>{{ election.title }}</h2>
      <p>Fecha de inicio: {{ election.voteInitialDate }}</p>
      <p>Fecha de fin: {{ election.voteFinalDate }}</p>
      <p>Estado: {{ electionStatus }}</p>
    </div>
    <div v-else>
      <p>Cargando datos de la elección...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../../utils/config';

export default {
  props: ['id'], // Recibimos el id como prop

  data() {
    return {
      election: null, // Aquí almacenaremos los datos de la elección
      electionStatus: '',
    };
  },

  async created() {
    await this.loadElectionData(); // Cargamos los datos de la elección al iniciar el componente
  },

  methods: {
    async loadElectionData() {
      try {
        const response = await axios.post(`${API_URL}/consultElection`, { id: this.id });
        console.log(response.data); // Ver los datos obtenidos
        this.setElectionStatus();
      } catch (error) {
        console.error('Error cargando la elección:', error);
      }
    },

    setElectionStatus() {
      const now = new Date();
      const startDate = new Date(this.election.voteInitialDate);
      const endDate = new Date(this.election.voteFinalDate);

      if (now < startDate) {
        this.electionStatus = 'PRÓXIMA';
      } else if (now > endDate) {
        this.electionStatus = 'FINALIZADA';
      } else {
        this.electionStatus = 'EN CURSO';
      }
    },
  },
};
</script>

<style scoped>
.election-consult {
  padding: 20px;
  background-color: #f8f9fa;
}

h1 {
  color: #333;
  text-align: center;
}

h2 {
  margin-top: 20px;
  font-size: 1.5rem;
}

p {
  font-size: 1rem;
  color: #666;
}
</style>
