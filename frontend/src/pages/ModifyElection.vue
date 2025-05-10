<template>
  <div class="modify-election-container">
    <ElectionForm :election="election" @close="goBack" />
  </div>
</template>

<script>
import ElectionForm from "../components/election/ElectionForm.vue";
import axios from "axios";
import { API_URL } from "../utils/config";

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
    async fetchElection() {      //CAMBIARLO A ELECTION
      const electionId = this.$route.query.id;
      try {
        const response = await axios.get(`${API_URL}elections/consultElection/${electionId}`);
        this.election = response.data.election;
      } catch (error) {
        console.error("Error al obtener la eleccion:", error);
      }
    },
  },
  mounted() {
    this.fetchElection();
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
