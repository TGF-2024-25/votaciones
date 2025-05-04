<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-lg form-container">
      <h3 class="text-center mb-4">
        {{ isEditing ? "Modificar Elección" : "Crear Nueva Elección" }}
      </h3>

      <!-- Mensaje de error (si existe) -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="submitForm">
        <!-- Título de la elección -->
        <div class="mb-3 d-flex flex-column">
          <label for="title" class="form-label text-bold"
            >Título de la elección</label
          >
          <input
            type="text"
            id="title"
            v-model="form.title"
            class="form-control input-custom"
            maxlength="100"
            required
          />
        </div>

        <!-- Lista de Participantes Actuales -->
        <div class="mb-3 d-flex flex-column">
          <label for="participants" class="form-label text-bold"
            >Participantes actuales (separados por coma)</label
          >
          <input
            readonly
            type="text"
            id="participants"
            v-model="newParticipantNames"
            class="form-control input-custom"
            placeholder="Lista de participantes"
          />
          <!-- <button type="button" class="btn btn-info mt-2" @click="addParticipants">Añadir Participantes</button> -->
        </div>

        <!-- Lista de Participantes Nuevos -->
        <div class="mb-3 d-flex flex-column">
          <label for="new-participants" class="form-label text-bold"
            >Nuevos participantes (separados por coma)</label
          >
          <input
            type="text"
            id="new-participants"
            v-model="newParticipantNames"
            class="form-control input-custom"
            placeholder="Escribe los nombres de los participantes"
          />
        </div>

        <!-- Imagen (opcional) -->
        <div class="mb-3 d-flex flex-column">
          <label for="image" class="form-label text-bold"
            >Imagen (opcional)</label
          >
          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            class="form-control input-custom file-input"
            accept="image/*"
          />
          <small class="text-muted">Formatos aceptados: JPG, PNG, GIF</small>
        </div>

        <!-- Fechas
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="init_date" class="form-label text-bold">Fecha de inicio</label>
            <input type="datetime-local" id="init_date" v-model="form.init_date" class="form-control input-custom" required>
          </div>
          <div class="col-md-6">
            <label for="end_date" class="form-label text-bold">Fecha de fin</label>
            <input type="datetime-local" id="end_date" v-model="form.end_date" class="form-control input-custom" required>
          </div>
        </div> -->

        <!-- Fechas -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="init_date" class="form-label text-bold"
              >Fecha de inicio</label
            >
            <input
              type="date"
              id="init_date"
              v-model="form.init_date"
              class="form-control input-custom"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="end_date" class="form-label text-bold"
              >Fecha de fin</label
            >
            <input
              type="date"
              id="end_date"
              v-model="form.end_date"
              class="form-control input-custom"
              required
            />
          </div>
        </div>

        <!-- Participantes (solo en edición) -->
        <div v-if="isEditing" class="mb-3">
          <h5 class="text-bold mb-3">Participantes</h5>
          <div v-if="participantes.length === 0" class="text-muted">
            No hay participantes aún
          </div>
          <div
            v-for="participante in participantes"
            :key="participante.id"
            class="d-flex justify-content-between align-items-center mb-2"
          >
            <span>{{ participante.name || participante.email }}</span>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="eliminarParticipante(participante.id)"
            >
              Eliminar
            </button>
          </div>
        </div>

        <!-- Botones finales -->
        <div class="d-flex flex-column align-items-center mt-4 w-100">
          <button type="submit" class="btn btn-warning btn-lg w-100 mb-2">
            {{ isEditing ? "Guardar Cambios" : "Crear Elección" }}
          </button>
          <button
            type="button"
            class="btn btn-danger btn-lg w-100"
            @click="$emit('close')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../../utils/config";

export default {
  props: {
    election: Object,
    participantes: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      form: {
        title: "",
        image: null,
        init_date: "",
        end_date: "",
        participantes: [],
      },
      newParticipantNames: "",
      errorMessage: "",
    };
  },
  computed: {
    isEditing() {
      return !!this.election;
    },
  },
  watch: {
    election: {
      immediate: true,
      handler(nuevaEleccion) {
        if (nuevaEleccion) {
          this.form.title = nuevaEleccion.title || "";
          this.form.init_date = this.formatDateForInput(
            nuevaEleccion.init_date
          );
          this.form.end_date = this.formatDateForInput(nuevaEleccion.end_date);
          this.cargarParticipantes(nuevaEleccion.id);
        } else {
          this.resetForm();
        }
      },
    },
    "form.end_date": function (newVal) {
      if (
        newVal &&
        this.form.init_date &&
        new Date(newVal) <= new Date(this.form.init_date)
      ) {
        this.errorMessage = "La fecha de fin debe ser posterior a la de inicio";
      } else {
        this.errorMessage = "";
      }
    },
  },
  methods: {
    formatDateForInput(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        this.errorMessage = "Formato de imagen no válido (solo JPG, PNG, GIF)";
        event.target.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = "La imagen no debe superar los 2MB";
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.image = file;
        this.errorMessage = "";
      };
      reader.readAsDataURL(file);
    },
    addParticipants() {
      this.form.participantes = [];
      const names = this.newParticipantNames
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean);
      if (names.length) {
        this.form.participantes.push(...names);
        this.newParticipantNames = "";
        this.errorMessage = "";
      } else {
        this.errorMessage = "Por favor, ingresa al menos un nombre válido";
      }
    },

    async cargarParticipantes(electionId) {
      try {
        const response = await axios.get(
          `${API_URL}elections/consultElection/${electionId}/participants`
        );
        const participantes = response.data.map(p => `${p.name} ${p.surname} <${p.email}>`);
        console.log({participantes})
        this.form.participantes = participantes
      } catch (error) {
        console.error("Error cargando participantes:", error);
        this.form.participantes = [];
      }
    },
    async eliminarParticipante(userId) {
      if (!confirm("¿Estás seguro de eliminar este participante?")) return;

      try {
        await axios.delete(
          `${API_URL}elections/${this.election.id}/participants/${userId}`
        );
        this.participantes = this.participantes.filter((p) => p.id !== userId);
      } catch (error) {
        console.error("Error eliminando participante:", error);
        this.errorMessage = "No se pudo eliminar el participante";
      }
    },
    resetForm() {
      this.form = {
        title: "",
        image: null,
        init_date: "",
        end_date: "",
        participantes: [],
      };
      this.newParticipantNames = "";
      this.errorMessage = "";
    },
    async submitForm() {
      if (new Date(this.form.end_date) <= new Date(this.form.init_date)) {
        this.errorMessage = "La fecha de fin debe ser posterior a la de inicio";
        return;
      }
      if (!this.form.title || this.form.title.trim() === "") {
        this.errorMessage = "El título no puede estar vacío.";
        return;
      }

      this.addParticipants();
      const electionData = {
        title: this.form.title,
        init_date: new Date(this.form.init_date), //formatDateForInput(this.form.init_date),
        end_date: new Date(this.form.end_date),
        participantes: this.form.participantes,
        image: null, //this.form.image
      };

      try {
        let response;
        if (this.isEditing) {
          response = await axios.put(
            `${API_URL}elections/modifyElection/${this.election.id}`,
            electionData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } else {
          response = await axios.post(
            `${API_URL}elections/createElection`,
            electionData,
            { headers: { "Content-Type": "application/json" } }
          );
        }

        console.log("✅ Elección guardada:", response.data);
        this.$emit("saved", response.data);
        this.$emit("close");
      } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        this.errorMessage =
          error.response?.data?.message || "Error al guardar la elección";
      }
    },
  },
};
</script>

<style scoped>
@import "../../styles/form.css";
</style>