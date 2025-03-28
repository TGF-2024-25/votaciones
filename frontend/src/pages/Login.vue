<template>
    <div class="login-container">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <!-- Incluir el formulario de LoginForm.vue -->
        <LoginForm @success="goToDashboard" />
    </div>
</template>

<script>
    import LoginForm from "../components/login/LoginForm.vue";

    export default {
        components: {
            LoginForm,
        },
        methods: {
            goToDashboard() {
            this.$router.push({ name: "home" });
            },
        },
    };
</script>

<style scoped>
    .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    }
</style>