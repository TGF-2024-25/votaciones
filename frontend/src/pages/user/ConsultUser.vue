<template>
    <div class="consult-user">
      <h3>Detalles del Usuario</h3>
  
      <!-- Si hay un usuario, mostramos los detalles -->
      <div v-if="user">
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Apellido:</strong> {{ user.surname }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Rol:</strong> {{ user.type }}</p>
  
        <!-- Mostrar foto de perfil si existe -->
        <div v-if="user.image">
          <img :src="user.image" alt="Foto de perfil" />
        </div>
  
        <!-- Botón para editar el usuario -->
        <div class="text-center mt-3" v-if="mostrarBotonAdmin">
          <button class="btn btn-primary" @click="editarUsuario">
            Editar Usuario
          </button>
        </div>
  
        <!-- Botón para borrar el usuario -->
        <div class="text-center mt-3" v-if="mostrarBotonAdmin">
          <button class="btn btn-danger" @click="confirmarBorrarUsuario">
            Eliminar Usuario
          </button>
        </div>
      </div>
  
      <!-- Si no hay datos mostramos un mensaje de error -->
      <div v-else class="alert alert-info text-center">
        <p>No hay detalles a mostrar</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { API_URL } from "../../utils/config";
  import jwtDecode from 'jwt-decode';
  
  export default {
    data() {
      return {
        user: null, // Detalles del usuario
      };
    },
    computed: {
      mostrarBotonAdmin() {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          return decoded.user.type === 'admin'; // Solo visible si el usuario es admin
        }
        return false;
      },
    },
    methods: {
      async fetchUserDetails(id) {
        try {
          const response = await axios.post(`${API_URL}users/consult`, {
            id: id,
          });
  
          if (response.data) {
            this.user = response.data.userConsulted;
          } else {
            throw new Error('No se encontraron detalles del usuario.');
          }
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      },
      editarUsuario() {
        this.$router.push({ path: '/modify-user', query: { id: this.user.id } });
      },
      confirmarBorrarUsuario() {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
          this.borrarUsuario();
        }
      },
      async borrarUsuario() {
        try {
          const response = await axios.post(`${API_URL}users/delete`, {
            id: this.user.id,
          });
  
          if (response.data) {
            alert('Usuario eliminado correctamente');
            this.$router.push('/list-user'); // Redirigir a la lista de usuarios
          } else {
            throw new Error('No se pudo eliminar el usuario.');
          }
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario.');
        }
      },
    },
    mounted() {
      const userId = this.$route.query.id;
      this.fetchUserDetails(userId);
    },
  };
  </script>
  
  <style scoped>
  @import '../../styles/consult.css';
  
  img {
    max-width: 150px;
    border-radius: 50%;
    margin-top: 10px;
  }
  </style>