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
          <label for="title" class="form-label text-bold">Título de la elección</label>
          <input type="text" id="title" v-model="form.title" class="form-control input-custom" maxlength="100" required>
        </div>

        <!-- Imagen (opcional) -->
        <div class="mb-3 d-flex flex-column">
          <label for="image" class="form-label text-bold">Imagen (opcional)</label>
          <input type="file" id="image" @change="handleImageUpload" class="form-control input-custom file-input" accept="image/*">
          <small class="text-muted">Formatos aceptados: JPG, PNG, GIF</small>
          <div v-if="form.imagePreview" class="mt-2">
            <img :src="form.imagePreview" alt="Previsualización" class="img-thumbnail" style="max-height: 150px;">
          </div>
        </div>

        <!-- Fechas -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="init_date" class="form-label text-bold">Fecha de inicio</label>
            <input type="datetime-local" id="init_date" v-model="form.init_date" class="form-control input-custom" required>
          </div>
          <div class="col-md-6">
            <label for="end_date" class="form-label text-bold">Fecha de fin</label>
            <input type="datetime-local" id="end_date" v-model="form.end_date" class="form-control input-custom" required>
          </div>
        </div>

        <!-- Participantes (solo en edición) -->
        <div v-if="isEditing" class="mb-3">
          <h5 class="text-bold mb-3">Participantes</h5>
          <div v-if="participantes.length === 0" class="text-muted">No hay participantes aún</div>
          <div v-for="participante in participantes" :key="participante.id" class="d-flex justify-content-between align-items-center mb-2">
            <span>{{ participante.name || participante.email }}</span>
            <button type="button" class="btn btn-sm btn-danger" @click="eliminarParticipante(participante.id)">Eliminar</button>
          </div>
        </div>
          
          <!-- Botones finales -->
        <div class="d-flex flex-column align-items-center mt-4 w-100">
          <button type="submit" class="btn btn-warning btn-lg w-100 mb-2">
            {{ isEditing ? "Guardar Cambios" : "Crear Elección" }}
          </button>
          <button type="button" class="btn btn-danger btn-lg w-100" @click="$emit('close')">Cancelar</button>
        </div>
    </form>
    </div>
</div>
</template>



<style scoped>
/* Contenedor del formulario */
.form-container {
  background-color: #f8f9fa; /* Fondo gris claro */
  border-radius: 15px;
  max-width: 450px;
  margin: auto;
}

/* Mensaje de error */
.alert-danger {
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
}

/* Inputs personalizados */
.input-custom {
  background-color: #e9ecef !important;
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 10px;
}

/* Asegurar que el input file también tenga fondo gris */
.file-input {
  background-color: #e9ecef !important;
  opacity: 1;
}

/* Estilo de los labels para que sean más notorios */
.text-bold {
  font-weight: bold;
}

/* Botón amarillo para enviar postulación */
.btn-warning {
  background-color: #ffc107;
  border: none;
  border-radius: 10px;
  color: black;
}

.btn-warning:hover {
  background-color: #e0a800;
}

/* Botón rojo para cancelar */
.btn-danger {
  border-radius: 10px;
}

.btn-danger:hover {
  background-color: #b02a37;
}

/* Título centrado y en negrita */
h3 {
  text-align: center;
  font-weight: bold;
}
</style>