import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

// Probar registro de usuario
export const testRegister = async () => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email: 'test@email.com',
            name: 'Usuario Prueba1',
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

// Probar login
export const testDelete = async () => {
    try {
        const response = await axios.post(`${API_URL}/deleteUser`, {
            email: 'test@email.com',
            password: '123456',
        });
        console.log('✅ Delete exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en delete:', error.response?.data || error.message);
    }
};

// Probar login
export const testUpdate = async () => {
    try {
        const response = await axios.post(`${API_URL}/updateUser`, {
            email: 'test@email.com',
            oldPassword: '123456',
            name: 'Usuario Actualizado',
            newPassword: '654321',
        });
        console.log('✅ Update exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en update:', error.response?.data || error.message);
    }
};

// Probar login
export const testSearch = async () => {
    try {
        const response = await axios.post(`${API_URL}/searchUsers`, {
            email: 'test@email.com',
            name: 'Usuario Nuevo',
        });
        console.log('✅ Search exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en search:', error.response?.data || error.message);
    }
};

// Probar login
export const testConsult = async () => {
    try {
        const response = await axios.post(`${API_URL}/consultUser`, {
            email: 'test@email.com',
        });
        console.log('✅ Consult exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error en consult:', error.response?.data || error.message);
    }
};