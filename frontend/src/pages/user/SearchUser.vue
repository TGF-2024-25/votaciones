<template>
    <SearchUserForm @close="goBack" />
  </template>
  
  <script>
  import SearchUserForm from "../../components/login/SearchUserForm.vue";
  
  export default {
    components: {
      SearchUserForm,
    },
    methods: {
      goBack() {
        this.$router.back();
      },
    },
  };
  </script>