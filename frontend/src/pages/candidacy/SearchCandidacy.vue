<template>
    <SearchCandidacyForm @close="goBack" />
</template>

<script>
import SearchCandidacyForm from "../../components/candidacy/SearchCandidacyForm.vue";

export default {
  components: {
    SearchCandidacyForm,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
