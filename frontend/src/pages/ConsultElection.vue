<template>
  <div class="consult-election">
    <h3>Detalles de la elección</h3>

    <div v-if="election">
      <p><strong>Título:</strong> {{ election.title }}</p>
      <p><strong>Inicio:</strong> {{ formatDateTime(election.init_date) }}</p> <!-- Comprobar Fechas -->
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

      <!-- Dropdown para seleccionar candidato -->
      <div v-if="candidates.length > 0 && getStatusText(election) === 'EN CURSO' && !hasVoted" class="candidate-selection">
        <h3 class="section-title">Elija Candidato:</h3>
        <select v-model="selectedCandidateId" class="form-select" style="width: 300px; margin: 0 auto;" size="1">
          <option disabled value="">Selecciona un candidato</option>
          <option v-for="candidate in candidates" :key="candidate.id" :value="candidate.id">
            {{ candidate.user }}
          </option>
        </select>
        <div class="text-center mt-3">
          <button class="vote-button" :disabled="!selectedCandidateId" style="font-size: 18px; padding: 12px 24px;"
            @click="voteForCandidate">
            VOTAR
          </button>
        </div>
      </div>

      <!-- Mostrar resultados si la elección ha finalizado -->
      <div v-if="getStatusText(election) === 'FINALIZADA'" class="text-center mt-3">
        <button class="btn btn-success" @click="consultarResultados">Ver resultados</button>

        <div v-if="resultados.length > 0" class="mt-3">
          <h4>Resultados:</h4>
          <ul class="list-group" style="max-width: 500px; margin: 0 auto;">
            <li v-for="resultado in resultados" :key="resultado.candidateId" class="list-group-item d-flex justify-content-between align-items-center">
              {{ resultado.user }} 
              <span class="badge bg-primary rounded-pill">{{ resultado.votes }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Botón para consultar candidaturas -->
      <div v-if="candidates.length > 0" class="text-center mt-3">
        <button class="btn btn-primary" @click="consultarCandidaturas">
          Consultar candidaturas
        </button>
      </div>
      
      <div v-else class="alert alert-info text-center">
        <p>No hay candidatos disponibles para consultar.</p>
      </div>

      <div v-if="postulable(election)" class="text-center mt-3">
        <button class="btn btn-primary" @click="postularCandidatura">
          Postularme como candidato
        </button>
      </div>

      <!-- Botones -->
      <div class="text-center mt-3" v-if="mostrarBotonModificarYBorrar">
        <button class="btn btn-warning" @click="editarElection">
          Modificar elección
        </button>

        <!-- Espacio entre los botones -->
        <span style="display: inline-block; width: 25px;"></span>

        <button class="btn btn-danger" @click="confirmarEliminar">
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
import { sha256 } from 'js-sha256';

export default {
  data() {
    return {
      election: null,
      candidates: [],
      selectedCandidateId: '',
      user: null,
      hasVoted: null,
      resultados: [],
    }
  },
  computed: {
    mostrarBotonModificarYBorrar() {
      const token = localStorage.getItem('token')
      if (token && this.election) {
        const decoded = jwtDecode(token)
        this.user = decoded.user
        return (
          decoded.user.type === 'admin' ||
          decoded.user.type === 'creator'
        )
      }
      return false
    },
  },
  watch: {
    election: {
      immediate: true,
      handler(nuevaEleccion) {
      if (nuevaEleccion) {
        this.buscarCandidaturas()
      }
    },
    }
  },

  methods: {
    async fetchElectionDetails(id) {
      try {
        const response = await axios.get(`${API_URL}elections/consultElection/${id}`)
        if (response.data) {
          this.election = response.data.election
        } else {
          throw new Error('No se encontraron detalles.')
        }
      } catch (error) {
        console.error('Error al obtener la elección:', error)
      }
    },
    async consultarResultados() {
      try {
        const response = await axios.get(`${API_URL}elections/countVotes/${this.election.id}`);
        console.log(response.data.votes);
        this.resultados = response.data.votes;
      } catch (error) {
        console.error('Error al obtener los resultados:', error);
        alert('No se pudieron cargar los resultados de la elección.');
      }
    },
    postularCandidatura() {
      this.$router.push({ path: '/create-candidacy', query: { id: this.election.id } });
    },
    async buscarCandidaturas() {
      this.errorMessage = "";
      try {
        const response = await axios.post(`${API_URL}candidacies/search`, {
          electionID: this.election.id,
          slogan: null,
          name: null,
          surname: null,
          email: null,
        });

        this.candidates = response.data.candidacies;
        this.candidates = this.candidates.filter(c => c.approved === true);

      } catch (error) {
        this.errorMessage = "Error al buscar candidaturas. Inténtalo de nuevo.";
      }
      return true;
    },
    async consultarCandidaturas() {
      localStorage.setItem('candidaturasEncontradas', JSON.stringify(this.candidates));
      this.$router.push({ path: '/list-candidacies' });
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
        const response = await axios.post(`${API_URL}elections/deleteElection/${this.election.id}` )
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
    hashVoterId: async (voterId) => {
      if (!voterId) {
        throw new Error('Se requiere un ID de votante para generar el hash.');
      }
      return sha256(voterId);
    },
    postulable(election) {
      const now = new Date();
      const esFutura = new Date(election.init_date) > now;
      const token = localStorage.getItem('token');
      if (token && esFutura) {
        const decoded = jwtDecode(token);
        this.user = decoded.user;
        return !this.candidates.some(candidate => candidate.user === this.user.email);
      }
      return false;
    },
    getStatusText(election) {
      const now = new Date()
      if (new Date(election.init_date) > now) return 'PRÓXIMA'
      if (new Date(election.end_date) < now) return 'FINALIZADA'
      return 'EN CURSO'
    },
    async voteForCandidate() {
      if (!this.selectedCandidateId) {
        alert('Por favor, selecciona un candidato antes de votar.');
        return;
      }

      try {
        const hash = await this.hashVoterId(this.user.email)
        // Enviar el voto al servidor
        const response = await axios.post(`${API_URL}elections/${this.election.id}/vote/`, {
          candidateId: this.selectedCandidateId,
          voterHashId: hash,
        })

        if (response.status === 200 || response.status === 201) {
          alert('Voto enviado con éxito', response.data);
          this.$router.push('/');
        } else {
          alert('Error al enviar el voto. Inténtalo de nuevo.');
        }
        
        
      } catch (error) {
        console.error('Error al enviar el voto:', error);
        alert('Error al enviar el voto');
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      this.user = decoded.user;
    }

    const electionId = this.$route.query.id;
    await this.fetchElectionDetails(electionId); // espera a que se cargue this.election

    try {
      const hash = await this.hashVoterId(this.user.email);
      const vote = await axios.post(`${API_URL}elections/verifyVote/`, {
        voterHashId: hash,
        electionId: this.election.id,
      });
      this.hasVoted = vote.data.vote !== null;
    } catch (error) {
      console.error("Error verificando voto:", error);
      this.hasVoted = true; // Asumimos que votó si hay error
    }
  },
}
</script>
