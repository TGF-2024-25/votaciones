import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CreateCandidacy from '../pages/candidacy/CreateCandidacy.vue';
import SearchCandidacy from '../pages/candidacy/SearchCandidacy.vue';
import ListCandidacies from '../pages/candidacy/ListCandidacies.vue';
import ConsultCandidacy from '../pages/candidacy/ConsultCandidacy.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import CreateElection from '../pages/CreateElection.vue';
import Vote from '../pages/Vote.vue';
import HomeElections from '../pages/HomeElections.vue';
//import EleccionFin '../pages/ElectionEnded.vue';

// Definir las rutas
const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/create-candidacy', component: CreateCandidacy },
  { path: '/search-candidacy', component: SearchCandidacy },
  { path: '/list-candidacies', component: ListCandidacies },
  {
    path: '/consult-candidacy',
    component: ConsultCandidacy,
    props: route => ({ id: route.query.id })
  },
  { path: '/login', component: Login }, // Ruta de inicio de sesión
  { path: '/register', component: Register }, // Ruta de registro
  { path: '/create-election', component: CreateElection },
  { path: '/vote', component: Vote },
  { path: '/home-elections', component: HomeElections },
  //{ path: '/election-ended', component: EleccionFin},
];

// Crear el router con historia en el navegador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Hook global que hace scroll hacia arriba al cambiar de ruta
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
