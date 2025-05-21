<template>
  <div class="search-page">
    <h2 class="title">¿Qué deseas buscar?</h2>

    <div class="button-container">
      <button class="search-button user" @click="irABusquedaUsuarios">
        Buscar Usuarios
      </button>

      <button class="search-button candidacy" @click="irABusquedaCandidaturas">
        Buscar Candidaturas
      </button>

      <button class="search-button election" @click="irABusquedaElecciones">
        Buscar Elecciones
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    irABusquedaUsuarios() {
      this.$router.push('/search-user');
    },
    irABusquedaCandidaturas() {
      this.$router.push('/search-candidacy');
    },
    irABusquedaElecciones() {
      this.$router.push('/search-elections');
    }
  }
}
</script>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.search-button {
  padding: 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease;
  color: white;
}

.search-button.user {
  background-color: #3e9bff;
}

.search-button.candidacy {
  background-color: #28a745;
}

.search-button.election {
  background-color: #ffe100;
  color: #333;
}

.search-button:hover {
  transform: scale(1.03);
  opacity: 0.9;
}
</style>
