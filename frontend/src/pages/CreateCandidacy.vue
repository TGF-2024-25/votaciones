<template>
  <div class="create-candidacy-container">
    <h2 class="text-center mb-4">Crear Candidatura</h2>
    <!-- Incluir el formulario de CandidacyForm.vue -->
    <CandidacyForm :candidatura="candidatura" @close="goBack" />
  </div>
</template>

<script>
import CandidacyForm from "../components/candidacy/CandidacyForm.vue";

export default {
  components: {
    CandidacyForm,
  },
  data() {
    return {
      candidatura: null, // Si no hay candidatura, se crea una nueva
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "home" }); // Redirige a la página principal o donde desees
    },
  },
};
</script>

<style scoped>
.create-candidacy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
