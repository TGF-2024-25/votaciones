import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CreateCandidacy from '../pages/candidacy/CreateCandidacy.vue';
import SearchCandidacy from '../pages/candidacy/SearchCandidacy.vue';
import ListCandidacies from '../pages/candidacy/ListCandidacies.vue';
import ConsultCandidacy from '../pages/candidacy/ConsultCandidacy.vue';
import ModifyCandidacy from '../pages/candidacy/ModifyCandidacy.vue';

import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import UserSettings from '../pages/user/UserSettings.vue';
import SearchUser from '../pages/user/SearchUser.vue';
import ListUsers from '../pages/user/ListUsers.vue';
import ConsultUser from '../pages/user/ConsultUser.vue';
import ModifyUser from '../pages/user/ModifyUser.vue';


import CreateElection from '../pages/CreateElection.vue';
import SearchElection from '../pages/election/SearchElection.vue';
import Vote from '../pages/Vote.vue';
import HomeElections from '../pages/HomeElections.vue';
import SearchPage from '../pages/SearchPage.vue';
import UserSettings from '../pages/UserSettings.vue';
import ElectionConsult from '../components/election/ElectionConsult.vue';
import ModifyElection from '../pages/ModifyElection.vue';
import ConsultElection from '../pages/ConsultElection.vue';
//import EleccionFin '../pages/ElectionEnded.vue';

// Definir las rutas
const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { 
    path: '/create-candidacy', 
    component: CreateCandidacy, 
    props: route => ({ id: route.query.id })
  },
  { path: '/search-candidacy', component: SearchCandidacy },
  { path: '/list-candidacies', component: ListCandidacies },
  { path: '/search-user', component: SearchUser },
  { path: '/list-user', component: ListUsers },
  
  {
    path: '/consult-candidacy',
    component: ConsultCandidacy,
    props: route => ({ id: route.query.id })
  },
  {
    path: '/modify-candidacy',
    component: ModifyCandidacy,
    props: route => ({ id: route.query.id })
  },
  {
    path: '/consult-user',
    component: ConsultUser,
    props: route => ({ id: route.query.id })
  },
  {
    path: '/modify-user',
    component: ModifyUser,
    props: route => ({ id: route.query.id })
  },

  //CRUD ELECTIONS
  { path: '/create-election', component: CreateElection },
  { path: '/search-elections', component: SearchElection },
  {
    path: '/consult-elections', // Usamos :id para capturar el ID de la elección
    component: ElectionConsult,
    props: route => ({ id: route.query.id }) // Pasamos el id como prop al componente
  },
  {
    path: '/modify-election',
    component: ModifyElection,
    props: route => ({ id: route.query.id })
  },
  { path: '/login', component: Login }, // Ruta de inicio de sesión
  { path: '/register', component: Register }, // Ruta de registro
  
  { path: '/vote', component: Vote },
  { path: '/list-elections', component: HomeElections },    //Lista de elecciones
  

  {
    path: '/consult-election/:userId',
    name: 'ConsultElection',
    component: ConsultElection,
  },
  {
    path: '/consult-election',
    component: ConsultElection,
    props: route => ({ id: route.query.id })
  },
  
  { path: '/search', component: SearchPage },
  { path: '/user-settings', component: UserSettings },
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
