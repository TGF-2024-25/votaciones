import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

// Login de usuario
export const loginUser = async (email, password) => {
    return await axios.post(`${API_URL}/login`, { email, password });
};

// Registrar un usuario
export const registerUser = async (email, name, photo, password) => {
    return await axios.post(`${API_URL}/register`, { email, name, photo, password });
};

// Logout del usuario
export const logoutUser = async () => {
    return await axios.post(`${API_URL}/logout`);
};

// Actualizar usuario
export const updateUser = async (email, name, photo, password) => {
    return await axios.put(`${API_URL}/update`, { email, name, photo, password });
};

// Eliminar usuario
export const deleteUser = async (email, password) => {
    return await axios.delete(`${API_URL}/delete`, { data: { email, password } });
};
