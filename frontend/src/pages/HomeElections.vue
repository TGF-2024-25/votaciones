<template>
  <div>
    <h3 class="text-center mb-4">Mis Elecciones asignadas</h3>

    <div v-if="!hasElections" class="alert alert-info text-center">
      No hay votaciones disponibles para mostrar.
    </div>

    <table v-if="hasElections" class="table table-striped">
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="election in userElections" :key="election.id">
          <td :data-label="'Título'">{{ election.title }}</td>
          <td :data-label="'Estado'">{{ getStatusText(election) }}</td>
          <td :data-label="'Inicio'">{{ formatDateTime(election.voteInitialDate) }}</td>
          <td :data-label="'Fin'">{{ formatDateTime(election.voteFinalDate) }}</td>
          <td :data-label="'Acción'">
            <button class="btn btn-info" @click="verEleccion(election)">
              Ver detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../utils/config';

export default {
  name: 'UserElectionList',
  data() {
    return {
      elections: [], // se llena en mounted()
      currentUser: {},
    };
  },
  computed: {
    hasElections() {
      return this.userElections.length > 0;
    },
    userElections() {
      return this.elections.filter(election => 
        election.participants?.includes(this.currentUser?.id) || 
        election.creator === this.currentUser?.id
      );
    }
  },
  methods: {
    verEleccion(election) {
      console.log(election);
      this.$router.push({ path: '/consult-election', query: { id: election.id } });
    },
    async cargarElecciones() {
      try {
        const response = await axios.get(`${API_URL}elections/user/${this.currentUser.id}`);
        this.elections = response.data;
      } catch (error) {
        console.error('Error cargando elecciones:', error);
      }
    },
    isElectionActive(election) {
      const now = new Date();
      return new Date(election.voteInitialDate) <= now && new Date(election.voteFinalDate) >= now;
    },
    getStatusText(election) {
      const now = new Date();
      if (new Date(election.voteInitialDate) > now) return 'PRÓXIMA';
      if (new Date(election.voteFinalDate) < now) return 'FINALIZADA';
      return 'EN CURSO';
    },
    formatDateTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + 
             ' ' + 
             date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
  },
  async mounted() {
    this.currentUser = this.$store.state.currentUser || {};
    await this.cargarElecciones();
  }
};
</script>

<style>

</style>


