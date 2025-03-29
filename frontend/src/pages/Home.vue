<template>
  <div class="home">
    <h1>Bienvenido al Home</h1>
    <p>Esta es la página de inicio.</p>

    <!-- Botón para ir a la página de creación de candidatura -->
    <router-link to="/create-candidacy">
      <button class="btn btn-primary mt-4">Ir a crear Candidatura</button>
    </router-link>

    <!-- Botón para ir a la página de búsqueda de candidatura -->
    <router-link to="/search-candidacy">
      <button class="btn btn-primary mt-4">Ir a buscar Candidatura</button>
    </router-link>
  </div>
</template>

<script setup>
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
</style>
