import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import CreateCandidacy from '../pages/CreateCandidacy.vue'; // Asegúrate de que la ruta sea correcta
import CreateElection from '../pages/CreateElection.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }, // Ruta de inicio de sesión
  { path: '/register', component: Register }, // Ruta de registro
  { path: '/create-candidacy', component: CreateCandidacy }, // Nueva ruta para crear candidatura
  { path: '/create-election', component: CreateElection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
