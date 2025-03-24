<template>
  <div>
    <h1>Aplicación Principal</h1>
    <UserTests />
    <CandidacyTests />
  </div>
</template>

<script>
import UserTests from './components/UserTest.vue';
import CandidacyTests from './components/candidacy/CandidacyTest.vue';

export default {
  name: 'App',
  components: {
    UserTests,
    CandidacyTests,
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
