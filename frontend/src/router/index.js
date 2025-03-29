import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CreateCandidacy from '../pages/candidacy/CreateCandidacy.vue';
import SearchCandidacy from '../pages/candidacy/SearchCandidacy.vue';
import ListCandidacies from '../pages/candidacy/ListCandidacies.vue';
import ConsultCandidacy from '../pages/candidacy/ConsultCandidacy.vue';

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
  }
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
