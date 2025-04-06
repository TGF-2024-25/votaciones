<template>
  <div>
    <h3 class="text-center mb-4">Candidaturas encontradas</h3>

    <!-- Mostrar mensaje si no hay candidaturas -->
    <div v-if="!hasCandidaturas" class="alert alert-info text-center">
      No hay candidaturas disponibles para mostrar.
    </div>

    <table v-if="hasCandidaturas" class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Eslogan</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="candidatura in candidaturas" :key="candidatura.id">
            <td :data-label="'Nombre'">{{ candidatura.nombre }}</td>
            <td :data-label="'Apellido'">{{ candidatura.apellido }}</td>
            <td :data-label="'Correo'">{{ candidatura.user }}</td>
            <td :data-label="'Eslogan'">{{ candidatura.slogan }}</td>
            <td :data-label="'Acción'">
            <button class="btn btn-info" @click="verCandidatura(candidatura)">
                Ver detalles
            </button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import { useCandidaciesStore } from "../stores/candidacies";

export default {
  computed: {
    candidaturas() {
      const candidaturasEncontradas = localStorage.getItem('candidaturasEncontradas');
      console.log("Candidaturas encontradas: " + candidaturasEncontradas);
      try {
        const candidaturasArray = JSON.parse(candidaturasEncontradas);
        return candidaturasArray || []; // Retorna un array vacío si no se pudo parsear
      } catch (error) {
        console.error("Error al parsear las candidaturas desde localStorage:", error);
        return []; // Si ocurre un error, retorna un array vacío
      }
      return candidaturasEncontradas;
      /*
      return [
        {
          id: 1,
          nombre: "Juan",
          apellido: "Pérez",
          correo: "juan.perez@example.com",
          eslogan: "Un futuro mejor para todos",
        },
        {
          id: 2,
          nombre: "Ana",
          apellido: "Gómez",
          correo: "ana.gomez@example.com",
          eslogan: "Por un cambio positivo",
        },
        {
          id: 3,
          nombre: "Carlos",
          apellido: "López",
          correo: "carlos.lopez@example.com",
          eslogan: "El compromiso de siempre",
        },
      ];
      */
    },
    hasCandidaturas() {
      return this.candidaturas && this.candidaturas.length > 0;
    },
  },
  methods: {
    verCandidatura(candidatura) {
      console.log(candidatura);
      this.$router.push({ path: '/consult-candidacy', query: { id: candidatura.id } });
    },
  },
};
</script>

<style>
@import '../../styles/listElements.css';
</style>