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
        <tr v-for="election in elections" :key="election.id">
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
      elections: [], // Se llena en mounted()
    };
  },
  computed: {
    hasElections() {
      return this.elections.length > 0;
    },
  },
  methods: {
    verEleccion(election) {
      //console.log(election);
      this.$router.push({ path: '/consult-election', query: { id: election.id } });
    },
    async cargarElecciones() {
      const eleccionesGuardadas = localStorage.getItem('eleccionesEncontradas');
      //console.log("Elecciones guardadas (raw):", eleccionesGuardadas);

      try {
        const eleccionesArray = JSON.parse(eleccionesGuardadas) || [];

        for (let i = 0; i < eleccionesArray.length; i++) {
          const id = eleccionesArray[i].id;

          try {
            const response = await axios.post(`${API_URL}elections/consult`, {
              id: id,
            });

            // Guardamos la versión completa
            //console.log(response);
            eleccionesArray[i] = response.data.election;
          } catch (err) {
            console.error(`Error al consultar la elección con id ${id}:`, err);
          }
        }
        console.log(eleccionesArray[0].init_date);
        this.elections = eleccionesArray;
      } catch (error) {
        console.error("Error al parsear las elecciones desde localStorage:", error);
      }
    },
    getStatusText(election) {
      const now = new Date();
      if (new Date(election.voteInitialDate) > now) return 'PRÓXIMA';
      if (new Date(election.voteFinalDate) < now) return 'FINALIZADA';
      return 'EN CURSO';
    },
      //console.log(election.voteInitialDate);
    // Asegurarse de que el formato sea YYYY-MM-DD
    //aux= dateString.toString().split('T')[0];
    //console.log(aux);
    //return dateString.split('T')[0];
    formatDateTime(dateString) {
  // Validar si la entrada es una cadena en formato YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    console.error('Formato de fecha no válido:', dateString);
    return 'Invalid Date';
  }

  // Convertir la cadena a un objeto Date
  const date = new Date(dateString);

  // Verificar si la conversión fue exitosa
  if (isNaN(date.getTime())) {
    console.error('No se pudo convertir la fecha:', dateString);
    return 'Invalid Date';
  }

  // Formatear la fecha como YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
  const day = String(date.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
  return `${year}-${month}-${day}`;
},
    
  },
  async mounted() {
    await this.cargarElecciones();
  },
};
</script>

<style>
/* Puedes agregar estilos personalizados aquí */
</style>
