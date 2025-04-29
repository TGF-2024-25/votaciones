<template>
  <div class="consult-election">
    <h3>Detalles de la elección</h3>

    <div v-if="election">
      <p><strong>Título:</strong> {{ election.title }}</p>
      <p><strong>Inicio:</strong> {{ formatDateTime(election.init_date) }}</p>    <!-- Comprobar Fechas -->
      <p><strong>Fin:</strong> {{ formatDateTime(election.end_date) }}</p>
      <p><strong>Estado:</strong> {{ getStatusText(election) }}</p>

      <!-- Mostrar imagen si existe -->
      <div v-if="election.image">
        <p><strong>Imagen:</strong></p>
        <img :src="election.image" alt="Imagen de la elección" style="max-width: 100%; height: auto;" />
      </div>

      <p v-if="election.creatorUser">
        <strong>Creador:</strong>
        {{ election.creatorUser.name }} {{ election.creatorUser.surname }} ({{ election.creatorUser.email }})
      </p>

      <!-- Botones -->
      <div class="text-center mt-3" v-if="mostrarBotonModificarYBorrar">
        <button class="btn btn-primary" @click="editarElection">
          Modificar elección
        </button>
        <button class="btn btn-danger ml-2" @click="confirmarEliminar">
          Borrar elección
        </button>
      </div>
    </div>

    <div v-else class="alert alert-info text-center">
      <p>No hay detalles de la elección para mostrar.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../utils/config'
import { jwtDecode } from 'jwt-decode'

export default {
  data() {
    return {
      election: null,
    }
  },
  computed: {
    mostrarBotonModificarYBorrar() {
      const token = localStorage.getItem('token')
      if (token && this.election) {
        const decoded = jwtDecode(token)
        return (
          decoded.user.type === 'admin' ||
          decoded.user.type === 'creator' ||
          decoded.user.id === this.election.creator
        )
      }
      return false
    },
  },
  methods: {
    async fetchElectionDetails(id) {
      try {
        const response = await axios.post(`${API_URL}elections/consult`, { id })
        if (response.data) {
          this.election = response.data.election
        } else {
          throw new Error('No se encontraron detalles.')
        }
      } catch (error) {
        console.error('Error al obtener la elección:', error)
      }
    },
    editarElection() {
      this.$router.push({ path: '/modify-election', query: { id: this.election.id } })
    },
    confirmarEliminar() {
      if (confirm('¿Estás seguro de que deseas eliminar esta elección?')) {
        this.eliminarElection()
      }
    },
    async eliminarElection() {
      try {
        const response = await axios.post(`${API_URL}elections/delete`, {
          id: this.election.id,
        })
        if (response.data) {
          alert('Elección eliminada correctamente')
          this.$router.push('/')
        } else {
          throw new Error('No se pudo eliminar.')
        }
      } catch (error) {
        console.error('Error al eliminar elección:', error)
        alert('No se pudo eliminar la elección.')
      }
    },
    formatDateTime(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    },
    getStatusText(election) {
      const now = new Date()
      if (new Date(election.init_date) > now) return 'PRÓXIMA'
      if (new Date(election.end_date) < now) return 'FINALIZADA'
      return 'EN CURSO'
    },
  },
  mounted() {
    const electionId = this.$route.query.id
    this.fetchElectionDetails(electionId)
  },
}
</script>
