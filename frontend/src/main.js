import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Estilos
import './styles/layout.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
