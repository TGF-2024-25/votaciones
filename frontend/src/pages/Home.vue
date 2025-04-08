<template>
  <div class="home">
    <h1>Bienvenido al Home</h1>
    <p>Esta es la página de inicio.</p>

    <router-link to="/home-elections">
      <button class="btn btn-primary mt-4">Incio Elecciones</button>
    </router-link>
    <!-- Botón para ir a la página de creación de candidatura -->
    <router-link to="/create-candidacy">
      <button class="btn btn-primary mt-4">Ir a crear Candidatura</button>
    </router-link>

      <!-- Botón para ir a la página de creación de Eleccion -->
    <router-link to="/create-election">
      <button class="btn btn-primary mt-4">Ir a Crear Eleccion</button>
    </router-link>

      <!-- Botón para ir a la página de creación de Eleccion -->
      <router-link to="/vote">
      <button class="btn btn-vote mt-4">Votar</button>
    </router-link>
    
    <!--<router-link to="/election-ended">
      <button class="btn btn-primary mt-4">Eleccion Finalizada</button>
    </router-link>-->

    <!-- Botón de inicio de sesión -->
    <router-link v-if="!isLoggedIn" to="/login">
      <button class="btn btn-primary mt-4">Iniciar sesión</button>
    </router-link>

    

    <!-- Botón de registro -->
    <router-link v-if="!isLoggedIn" to="/register">
      <button class="btn btn-success mt-4">Registrarse</button>
    </router-link>

    <!-- Botón de logout si el usuario está autenticado -->
    <button v-else @click="confirmLogout" class="btn btn-secondary mt-4">Cerrar sesión</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Estado para verificar si el usuario está autenticado
    };
  },
  methods: {
    checkAuth() {
      // Verificar si existe un token en localStorage
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    confirmLogout() {
      // Mostrar una alerta de confirmación
      const confirm = window.confirm("¿Quieres cerrar sesión?");
      if (confirm) {
        this.logout(); // Llamar al método logout si el usuario confirma
      }
    },
    logout() {
      // Eliminar el token de localStorage
      localStorage.removeItem("token");
      this.isLoggedIn = false; // Actualizar el estado de autenticación
      this.$router.go(0);
    },
  },
  mounted() {
    this.checkAuth(); // Verificar autenticación al cargar la página
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  background-color: #0056b3;
}
.btn-vote {
  background-color: #ff8800;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>