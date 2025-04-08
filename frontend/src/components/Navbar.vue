<template>
  <nav class="layout">
    <RouterLink to="/" class="home-link">Home</RouterLink>

    <!-- Botón de lupa-->
    <button 
      v-if="mostrarBotonLupa" 
      class="lupa-button" 
      @click="irALaOtraPagina"
      title="Ir a detalles"
    >
      🔍
    </button>
  </nav>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  computed: {
    mostrarBotonLupa() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.type == 'admin';
      }
      return false;
    }
  },
  methods: {
    irALaOtraPagina() {
      this.$router.push('/search');
    }
  }
}
</script>

<style scoped>
@import '../styles/layout.css';

.lupa-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
}
</style>
