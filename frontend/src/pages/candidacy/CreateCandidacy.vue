<template>
  <CandidacyForm :candidatura="candidatura" @close="goBack" />
</template>

<script>
import CandidacyForm from "../../components/candidacy/CandidacyForm.vue";

export default {
  components: {
    CandidacyForm,
  },
  data() {
    return {
      candidatura: null,
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
.create-candidacy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
