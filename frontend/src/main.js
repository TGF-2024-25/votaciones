import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

createApp(App).mount('#app')

const API_URL = 'http://localhost:3000/api/users';

// Probar registro de usuario
export const testRegister = async () => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email: 'test@email.com',
            name: 'Usuario Prueba',
            photo: 'foto.jpg',
            password: '123456',
        });
        console.log('✅ Registro exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en registro:', error.response?.data || error.message);
    }
};

// Probar login
export const testLogin = async () => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: 'test@email.com',
            password: '123456',
        });
        console.log('✅ Login exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en login:', error.response?.data || error.message);
    }
};

// Probar logout
export const testLogout = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        console.log('✅ Logout exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en logout:', error.response?.data || error.message);
    }
};
