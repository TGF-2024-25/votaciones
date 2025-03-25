<template>
  <div>
    <h1>Aplicación Principal</h1>
    <UserTests />
    <CandidacyTests />
    <ElectionTest />
  </div>
</template>

<script>
import UserTests from './components/UserTest.vue';
import CandidacyTests from './components/candidacy/CandidacyTest.vue';
import ElectionTest from './components/ElectionTest.vue';

export default {
  name: 'App',
  components: {
    UserTests,
    CandidacyTests,
    ElectionTest,
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
