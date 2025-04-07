<template>
  <div>
    <h3 class="text-center mb-4">Candidaturas encontradas</h3>

    <div v-if="!hasCandidaturas" class="alert alert-info text-center">
      No hay candidaturas disponibles para mostrar.
    </div>

    <table v-if="hasCandidaturas" class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Eslogan</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="candidatura in candidaturas" :key="candidatura.id">
          <td :data-label="'Nombre'">{{ candidatura.user?.name || 'N/A' }}</td>
          <td :data-label="'Apellido'">{{ candidatura.user?.surname || 'N/A' }}</td>
          <td :data-label="'Correo'">{{ candidatura.user?.email || candidatura.user }}</td>
          <td :data-label="'Eslogan'">{{ candidatura.slogan }}</td>
          <td :data-label="'Acción'">
            <button class="btn btn-info" @click="verCandidatura(candidatura)">
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
import { API_URL } from '../../utils/config';

export default {
  data() {
    return {
      candidaturas: [], // se llena en mounted()
    };
  },
  computed: {
    hasCandidaturas() {
      return this.candidaturas.length > 0;
    },
  },
  methods: {
    verCandidatura(candidatura) {
      console.log(candidatura);
      this.$router.push({ path: '/consult-candidacy', query: { id: candidatura.id } });
    },
    async cargarCandidaturas() {
      const candidaturasEncontradas = localStorage.getItem('candidaturasEncontradas');
      console.log("Candidaturas encontradas (raw):", candidaturasEncontradas);

      try {
        const candidaturasArray = JSON.parse(candidaturasEncontradas) || [];

        for (let i = 0; i < candidaturasArray.length; i++) {
          const id = candidaturasArray[i].id;

          try {
            const response = await axios.post(`${API_URL}candidacies/consult`, {
              id: id,
            });

            // Guardamos la versión completa
            candidaturasArray[i] = response.data.candidacyConsulted;
          } catch (err) {
            console.error(`Error al consultar la candidatura con id ${id}:`, err);
          }
        }

        this.candidaturas = candidaturasArray;
      } catch (error) {
        console.error("Error al parsear las candidaturas desde localStorage:", error);
      }
    },
  },
  async mounted() {
    await this.cargarCandidaturas();
  },
};
</script>

<style>
@import '../../styles/listElements.css';
</style>
