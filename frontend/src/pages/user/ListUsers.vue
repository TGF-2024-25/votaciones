<template>
    <div>
      <h3 class="text-center mb-4">Usuarios encontrados</h3>
  
      <div v-if="!hasUsuarios" class="alert alert-info text-center">
        No hay usuarios disponibles para mostrar.
      </div>
  
      <table v-if="hasUsuarios" class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.email">
            <td :data-label="'Nombre'">{{ usuario.name || 'N/A' }}</td>
            <td :data-label="'Apellido'">{{ usuario.surname || 'N/A' }}</td>
            <td :data-label="'Correo'">{{ usuario.email || 'N/A' }}</td>
            <td :data-label="'Acción'">
              <button class="btn btn-info" @click="verUsuario(usuario)">
                Ver detalles
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { API_URL } from '../../utils/config';
  
  export default {
    data() {
      return {
        usuarios: []
      };
    },
    computed: {
      hasUsuarios() {
        console.log(this.usuarios.length);
        return this.usuarios.length > 0;
      },
    },
    methods: {
      verUsuario(usuario) {
        console.log(usuario.email);
        this.$router.push({ path: '/consult-user', query: { id: usuario.email } });
      },
      async cargarUsuarios() {
        const usuariosEncontrados = localStorage.getItem('usuariosEncontrados');
        console.log("Usuarios encontrados (raw):", usuariosEncontrados);

        try {
          const usuariosArray = JSON.parse(usuariosEncontrados) || [];
  
          for (let i = 0; i < usuariosArray.length; i++) {
            const email = usuariosArray[i].email;
  
            try {
              const response = await axios.post(`${API_URL}users/consultUser`, {
                email: email,
              });
              // Guardamos la versión completa
              usuariosArray[i] = response.data.user;
            } catch (err) {
              console.error(`Error al consultar el usuario con id ${email}:`, err);
            }
          }
  
          this.usuarios = usuariosArray;
        } catch (error) {
          console.error("Error al parsear los usuarios desde localStorage:", error);
        }
      },
    },
    async mounted() {
      await this.cargarUsuarios();
    },
  };
  </script>
  
  <style>
  @import '../../styles/listElements.css';
  </style>