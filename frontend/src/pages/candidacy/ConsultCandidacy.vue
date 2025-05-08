<template>
  <div class="consult-candidacy">
    <h3>Detalles de la candidatura</h3>

    <!-- Si hay una candidatura, mostramos los detalles -->
    <div v-if="candidacy">
      <p><strong>Nombre:</strong> {{ candidacy.user.name }} {{ candidacy.user.surname }}</p>
      <p><strong>Email:</strong> {{ candidacy.user.email }}</p>
      <p><strong>Eslogan:</strong> {{ candidacy.slogan }}</p>
      <p><strong>Texto:</strong> {{ candidacy.text }}</p>
      <p><strong>Video:</strong></p>
      <div v-if="candidacy.video">
        <video v-if="candidacy.video" width="200" controls>
          <source :src="candidacy.video" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
      <div v-else>
        <p><strong>   No disponible</strong></p>
      </div>

      <!-- Mostrar foto de perfil si existe -->
      <div v-if="candidacy.user.image">
        <img :src="candidacy.user.image" alt="Foto de perfil" />
      </div>

      <p><strong>Aprobada:</strong> {{ candidacy.approved ? 'Sí' : 'No' }}</p>

      <!-- Botón para aprobar/desaprobar la candidatura -->
      <div class="text-center mt-3" v-if="mostrarBotonAprobacion">
        <button
          class="btn"
          :class="candidacy.approved ? 'btn-danger' : 'btn-success'"
          @click="toggleAprobacion"
        >
          {{ candidacy.approved ? 'Desaprobar' : 'Aprobar' }} candidatura
        </button>
      </div>

      <!-- Botón para modificar la candidatura -->
      <div class="text-center mt-3" v-if="mostrarBotonModificarYBorrar">
        <button class="btn btn-primary" @click="editarCandidatura">
          Modificar candidatura
        </button>
      </div>

      <!-- Botón para borrar la candidatura -->
      <div class="text-center mt-3" v-if="mostrarBotonModificarYBorrar">
        <button class="btn btn-danger" @click="confirmarBorrarCandidatura">
          Borrar candidatura
        </button>
      </div>

    </div>

    <div v-else-if="isLoading" class="text-center">
      <p>Cargando datos...</p>
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
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      candidacy: null,
      isLoading: true,
    };
  },
  computed: {
    mostrarBotonAprobacion() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.type == 'admin' || decoded.user.type == 'creator';
      }
      return false;
    },
    mostrarBotonModificarYBorrar() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.type == 'admin' || decoded.user.type == 'creator' || decoded.user.email === this.candidacy.user.email;
      }
      return false;
    },
  },
  methods: {
    async fetchCandidacyDetails(id) {
      try {
        this.isLoading = true;
        const response = await axios.post(`${API_URL}candidacies/consult`, {
          id: id,
        });
        console.log(response);
        if (response.data) {
          this.candidacy = response.data.candidacyConsulted;
        } else {
          throw new Error('No se encontraron detalles de la candidatura.');
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    async toggleAprobacion() {
      try {
        const updated = !this.candidacy.approved;

        const response = await axios.post(`${API_URL}candidacies/update`, {
          id: this.candidacy.id,
          approved: updated,
        });

        if (response.data) {
          this.candidacy.approved = updated;
        } else {
          throw new Error('No se pudo actualizar el estado de aprobación.');
        }
      } catch (error) {
        alert('Error al cambiar el estado de la candidatura.');
      }
    },
    editarCandidatura() {
      this.$router.push({ path: '/modify-candidacy', query: { id: this.candidacy.id } });
    },
    // Confirmación antes de borrar la candidatura
    confirmarBorrarCandidatura() {
      if (confirm('¿Estás seguro de que quieres eliminar esta candidatura? Esta acción no se puede deshacer.')) {
        this.borrarCandidatura();
      }
    },
    // Borrar la candidatura después de la confirmación
    async borrarCandidatura() {
      try {
        const response = await axios.post(`${API_URL}candidacies/delete`, {
          id: this.candidacy.id,
        });

        if (response.data) {
          alert('Candidatura eliminada correctamente');
          this.$router.push('/'); // Redirigir a la lista de candidaturas, o a donde sea necesario
        } else {
          throw new Error('No se pudo eliminar la candidatura.');
        }
      } catch (error) {
        alert('Error al eliminar la candidatura.');
      }
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
