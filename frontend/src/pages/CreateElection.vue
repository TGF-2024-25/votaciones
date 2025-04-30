<template>
  <ElectionForm :election="election" @close="goBack" />
</template>

<script>
import ElectionForm from "../components/election/ElectionForm.vue";  // Importa el formulario de elección


export default {
  components: {
    ElectionForm,
  },
  data() {
    return {
      election: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.create-election-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
