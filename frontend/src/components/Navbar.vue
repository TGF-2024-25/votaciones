<template>
  <nav class="layout">
    <RouterLink to="/" class="home-link">Home</RouterLink>

    <!-- Mostrar nombre y apellidos del usuario logueado -->
    <span v-if="usuarioLogueado" class="user-info">
      {{ usuarioLogueado.name }} {{ usuarioLogueado.surname }}
    </span>

    <!-- Botón de lupa -->
    <button 
      v-if="mostrarBotonLupa" 
      class="lupa-button" 
      @click="irALaOtraPagina"
      title="Ir a detalles"
    >
      🔍
    </button>

    <!-- Botón de ajustes -->
    <button 
      v-if="mostrarBotonAjustes" 
      class="settings-button" 
      @click="irAjustes"
      title="Ajustes de usuario"
    >
      ⚙️
    </button>
  </nav>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      usuarioLogueado: null, // Datos del usuario logueado
    };
  },
  computed: {
    mostrarBotonLupa() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.type === 'admin';
      }
      return false;
    },
    mostrarBotonAjustes() {
      const token = localStorage.getItem('token');
      return !!token; // Mostrar el botón si hay un token
    }
  },
  methods: {
    irALaOtraPagina() {
      this.$router.push('/search');
    },
    irAjustes() {
      this.$router.push('/user-settings');
    },
    cargarUsuarioLogueado() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        this.usuarioLogueado = decoded.user; // Asignar los datos del usuario logueado
      }
    }
  },
  mounted() {
    this.cargarUsuarioLogueado(); // Cargar los datos del usuario al montar el componente
  }
};
</script>

<style scoped>
@import '../styles/layout.css';

.lupa-button,
.settings-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
}
</style>