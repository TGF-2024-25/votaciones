<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-lg form-container">
      <h3 class="text-center mb-4">
        {{ isEditing ? "Modificar Candidatura" : "Postularme como Candidato" }}
      </h3>

      <!-- Mensaje de error (si existe) -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="submitForm">
        
        <!-- Eslogan de la candidatura -->
        <div class="mb-3 d-flex flex-column">
          <label for="eslogan" class="form-label text-bold">Eslogan de la candidatura</label>
          <input type="text" id="eslogan" v-model="form.eslogan" class="form-control input-custom" maxlength="50" required>
        </div>

        <!-- Objetivos y Motivaciones -->
        <div class="mb-3 d-flex flex-column">
          <label for="descripcion" class="form-label text-bold">Objetivos y Motivaciones</label>
          <textarea id="descripcion" v-model="form.descripcion" class="form-control input-custom" maxlength="250" rows="4" required></textarea>
        </div>

        <!-- Vídeo de presentación -->
        <div class="mb-3 d-flex flex-column">
          <label for="video" class="form-label text-bold">Vídeo de presentación (opcional)</label>
          <input type="file" id="video" @change="handleFileUpload" class="form-control input-custom file-input" accept="video/mp4">
        </div>

        <!-- Botones centrados -->
        <div class="d-flex flex-column align-items-center mt-4 w-100">
          <button type="submit" class="btn btn-warning btn-lg w-100 mb-2">
            {{ isEditing ? "Guardar Cambios" : "Enviar Postulación" }}
          </button>
          <button type="button" class="btn btn-danger btn-lg w-100" @click="$emit('close')">Cancelar</button>
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
    candidatura: Object, // Datos de candidatura si se está editando
  },
  data() {
    return {
      form: {
        eslogan: "",
        descripcion: "",
        video: null, 
      },
      errorMessage: "",
    };
  },
  computed: {
    isEditing() {
      return !!this.candidatura; // Si hay datos, estamos editando
    },
  },
  watch: {
    // Observa cambios en la prop candidatura y actualiza el formulario
    candidatura: {
      immediate: true, // Ejecuta esto también al montar el componente
      handler(nuevaCandidatura) {
        if (nuevaCandidatura) {
          this.form.eslogan = nuevaCandidatura.slogan || "";
          this.form.descripcion = nuevaCandidatura.text || "";
        }
        else {
          this.form.eslogan = "";
          this.form.descripcion = "";
          this.form.video = null;
        }
      }
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.size <= 50 * 1024 * 1024 && file.type === "video/mp4") {
        this.form.video = file;
      } else {
        alert("El archivo debe ser un video .mp4 y no superar los 50MB");
        event.target.value = "";
      }
    },
    async submitForm() {
      this.errorMessage = "";

      try {
        let response;
        if (this.isEditing) {// TODO
          response = await axios.put(`${API_URL}candidacies/update/${this.candidatura.id}`, {
            slogan: this.form.eslogan,
            text: this.form.descripcion,
            video: this.form.video,
          });
        } else {
          response = await axios.post(`${API_URL}candidacies/create`, {
            electionId: "12345",
            slogan: this.form.eslogan,
            text: this.form.descripcion,
            user: "test@email.com",
            video: this.form.video,
          });
        }

        console.log("✅ Candidatura enviada con éxito:", response.data);
      } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        this.errorMessage = "Error al enviar la candidatura. Inténtalo de nuevo.";
      }
    },
  },
};
</script>

<style>
@import '../../styles/form.css';
</style>
