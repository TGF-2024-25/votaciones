import axios from 'axios';

const API_URL = 'http://localhost:3000/api/elections';

export const testElectionCreate = async () => {
    try {
        const response = await axios.post(`${API_URL}/createElection`, {
            title: 'Nueva Eleccion',
            photoUrl: null,
            initialDate: '28-03-2025',
            finalDate: '29-03-2025',
        });
        console.log('✅ Elección creada con exito:', response.data);
    } catch (error) {
        console.error('❌ Error en creacion:', error.response?.data || error.message);
    }
};

export const testElectionUpdate = async () => {
    try {
        const response = await axios.post(`${API_URL}/updateElection`, {
            id: '100000001',
            title: 'Eleccion MODIFICADA',
            photoUrl: null,
            initialDate: '20-03-2025',
            finalDate: '28-03-2025',
        });
        console.log('✅ Elección modificada con exito:', response.data);
    } catch (error) {
        console.error('❌ Error al modificar:', error.response?.data || error.message);
    }
};


export const testElectionConsult = async () => {
    try {
        const response = await axios.get(`${API_URL}/consultElection/`, {
            id: '100000000',
        });
        console.log('✅ Elección mostrada con exito:', response.data);
    } catch (error) {
        console.error('❌ Error al mostrar:', error.response?.data || error.message);
    }
};


export const testElectionDelete = async () => {
    try {
        const response = await axios.post(`${API_URL}/deleteElection`, {
            id: '100000000',
        });
        console.log('✅ Elección eliminada con exito:', response.data);
    } catch (error) {
        console.error('❌ Error al eliminar:', error.response?.data || error.message);
    }
};