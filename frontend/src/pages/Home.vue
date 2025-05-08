<template>
  <div class="home">
    <h1>Bienvenido a E-Voting</h1>
    <!-- <p>Esta es la página de inicio.</p> -->
    <div></div>
    <div></div>

     <!-- Mostrar elecciones en curso si el usuario está autenticado -->
     <div v-if="checkAuth() && ongoingElections.length > 0" class="elections-section">
      <h2>Mis elecciones en Curso</h2>
      <ul>
        <li v-for="election in ongoingElections" :key="election.id" class="election-item">
          <!-- <p><strong>{{ election.title }}</strong></p> -->
          <!-- Botón con el título de la elección -->
          <br>
              <span class="end-date">
                Fecha de fin: {{ formatDateTime(election.end_date) }}
              </span>
              <br>
          <router-link :to="`/consult-election?id=${election.id}`">
            <button class="btn-vote">{{election.title }}</button>
            
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else-if="checkAuth() && ongoingElections.length === 0" class="no-elections">
      <h3>No tienes elecciones en curso en este momento</h3>
    </div>
    

      <!-- Botón para ir a la página de creación de Eleccion -->
    <router-link v-if="electionCreator()" to="/create-election">
      <button class="btn btn-primary mt-4">Ir a Crear Eleccion</button>
    </router-link>
    <span style="display: inline-block; width: 5px;"></span>

      <!-- Botón para ir a la página de búsqueda de Eleccion -->
    <router-link v-if="searchElection()" to="/search-elections">
      <button class="btn btn-primary mt-4">Ir a buscar eleccion</button>
    </router-link>
    <span style="display: inline-block; width: 5px;"></span>

    <!-- Botón de inicio de sesión -->
    <router-link v-if="!isLoggedIn" to="/login">
      <button class="btn btn-primary mt-4">Iniciar sesión</button>
    </router-link>

    <span style="display: inline-block; width: 15px;"></span>

    <!-- Botón de registro -->
    <router-link v-if="!isLoggedIn" to="/register">
      <button class="btn btn-success mt-4">Registrarse</button>
    </router-link>

    <!-- Botón de logout si el usuario está autenticado -->
    <button v-else @click="confirmLogout" class="btn btn-secondary mt-4">Cerrar sesión</button>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { API_URL } from "../utils/config";

export default {
  data() {
    return {
      isLoggedIn: false, // Estado para verificar si el usuario está autenticado
      ongoingElections: [],
    };
  },
  methods: {
    checkAuth() {
      // Verificar si existe un token en localStorage
      this.isLoggedIn = !!localStorage.getItem("token");
      return this.isLoggedIn; // Retornar el estado de autenticación
    },
    async buscarEleccionesEnCurso() {
  try {
    const token = localStorage.getItem('token');
    let email = null;

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.user.type === 'user') {
        email = decoded.user.email;
      }
    }

    const response = await axios.post(`${API_URL}elections/search`, {
      email: email
    });

    const now = new Date();

    const elections = Array.isArray(response.data)
      ? response.data
      : response.data?.elections || [];

    this.ongoingElections = elections.filter((election) => {
      const startDate = new Date(this.formatDateTime(election.init_date));
      const endDate = new Date(this.formatDateTime(election.end_date));
      return now >= startDate && now <= endDate;
    });
  } catch (error) {
    console.error("Error al buscar elecciones en curso:", error);
    this.ongoingElections = [];
  }
},
    getStatusText(election) {
      const now = new Date();
      const startDate = new Date(election.voteInitialDate);
      const endDate = new Date(election.voteFinalDate);

      console.log("Comparando fechas:", { now, startDate, endDate });


      if (now < startDate) return "PRÓXIMA";
      if (now > endDate) return "FINALIZADA";
      return "EN CURSO";
    },

    formatDateTime(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    },
    electionCreator() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.type === 'admin' || decoded.user.type === 'creator';
      }
      return false; 
    },
    searchElection() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.type === 'user';
      }
      return false; 
    },
    confirmLogout() {
      // Mostrar una alerta de confirmación
      const confirm = window.confirm("¿Quieres cerrar sesión?");
      if (confirm) {
        this.logout(); // Llamar al método logout si el usuario confirma
      }
    },
    logout() {
      // Eliminar el token de localStorage
      localStorage.removeItem("token");
      this.isLoggedIn = false; // Actualizar el estado de autenticación
      this.$router.go(0);
    },
  },
  mounted() {
    this.checkAuth(); // Verificar autenticación al cargar la página

    if (this.isLoggedIn) {
    this.buscarEleccionesEnCurso(); // Carga elecciones si el usuario está logueado
  }
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  background-color: #0056b3;
}
.btn-vote {
  background-color: #ffa600;
  color: rgb(0, 0, 0);
  border: 2px solid #000000;
  border-radius: 10px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);padding: 15px 100px; 
  font-size: 16px; /* Aumentar el tamaño de la fuente */
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.elections-section ul {
  list-style-type: none; /* Eliminar los puntos de la lista */
  padding: 0;
  margin: 0;
}

.end-date {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.election-item {
  padding: 10px 0; /* Añadir un poco de espacio entre los elementos */
}
</style>

