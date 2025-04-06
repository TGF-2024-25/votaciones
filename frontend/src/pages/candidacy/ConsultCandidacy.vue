<template>
  <div class="consult-candidacy">
    <h3>Detalles de la candidatura</h3>

    <!-- Si hay una candidatura, mostramos los detalles -->
    <div v-if="candidacy">
      <p><strong>Nombre:</strong> {{ candidacy.user.name }} {{ candidacy.user.surname }}</p>
      <p><strong>Email:</strong> {{ candidacy.user.email }}</p>
      <p><strong>Eslogan:</strong> {{ candidacy.slogan }}</p>
      <p><strong>Texto:</strong> {{ candidacy.text }}</p>

      <!-- Mostrar video si existe -->
      <div v-if="candidacy.video">
        <p><strong>Video:</strong> <a :href="candidacy.video" target="_blank">Ver Video</a></p>
      </div>

      <!-- Mostrar foto de perfil si existe -->
      <div v-if="candidacy.user.image">
        <img :src="candidacy.user.image" alt="Foto de perfil" />
      </div>

      <p><strong>Aprobada:</strong> {{ candidacy.approved ? 'Sí' : 'No' }}</p>
    </div>

    <!-- Si no hay datos mostramos un mensaje de error -->
    <div v-else class="alert alert-info text-center">
      <p>No hay detalles a mostrar</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { API_URL } from "../../utils/config";

export default {
  data() {
    return {
      candidacy: null,
    };
  },
  methods: {
    async fetchCandidacyDetails(id) {
      try {
        console.log("Buscando candidatura con id: " + id)
        const response = await axios.post(`${API_URL}candidacies/consult`, {
          id: id,
        });

        if (response.data) {
          this.candidacy = response.data.candidacyConsulted;
        } else {
          throw new Error('No se encontraron detalles de la candidatura.');
        }
      } catch (error) {
        console.error('Error al obtener la candidatura:', error);
      }
      /*
      this.candidacy = {
        id: "12345-uuid",
        user: {
          name: "Juan",
          surname: "Pérez",
          email: "user@example.com",
        },
        electionId: 1,
        slogan: "Un futuro mejor",
        text: "Aquí va el texto de la candidatura",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        approved: false,
      };
      */
    },
  },
  mounted() {
    const candidacyId = this.$route.query.id;
    this.fetchCandidacyDetails(candidacyId);
  },
};
</script>

<style scoped>
@import '../../styles/consult.css';
</style>
