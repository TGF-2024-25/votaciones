<template>
  <div>
    <h1>Aplicación Principal</h1>
    <UserTests />
  </div>
</template>

<script>
import UserTests from './components/UserTest.vue';

export default {
  name: 'App',
  components: {
    UserTests,
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
