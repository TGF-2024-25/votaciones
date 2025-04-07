<template>
  <div class="modify-candidacy-container">
    <CandidacyForm :candidatura="candidatura" @close="goBack" />
  </div>
</template>

<script>
import CandidacyForm from "../../components/candidacy/CandidacyForm.vue";
import axios from "axios";
import { API_URL } from "../../utils/config";

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
    async fetchCandidacy() {
      const candidacyId = this.$route.query.id; 
      try {
        const response = await axios.post(`${API_URL}candidacies/consult`, {
          id: candidacyId,
        });
        this.candidatura = response.data.candidacyConsulted;
      } catch (error) {
        console.error("Error al obtener la candidatura:", error);
      }
    },
  },
  mounted() {
    this.fetchCandidacy();
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
