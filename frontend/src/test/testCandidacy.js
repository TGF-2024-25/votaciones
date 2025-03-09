import axios from 'axios';

const API_URL = 'http://localhost:3000/api/candidacies';

// Probar creación de candidatura
export const testCreateCandidacy = async () => {
    try {
        const response = await axios.post(`${API_URL}/create`, {
            electionId: '12345',
            slogan: '¡Por un futuro mejor!',
            text: 'Nuestra misión es mejorar la comunidad.',
            user: 'user123',
            video: 'video.mp4',
        });
        console.log('✅ Creación de candidatura exitosa:', response.data);
    } catch (error) {
        console.error('❌ Error en la creación de candidatura:', error.response?.data || error.message);
    }
};

// Probar eliminación de candidatura
export const testDeleteCandidacy = async () => {
    try {
        const response = await axios.post(`${API_URL}/delete`, {
            id: 'candidacy123',
        });
        console.log('✅ Eliminación de candidatura exitosa:', response.data);
    } catch (error) {
        console.error('❌ Error en la eliminación de candidatura:', error.response?.data || error.message);
    }
};

// Probar actualización de candidatura
export const testUpdateCandidacy = async () => {
    try {
        const response = await axios.post(`${API_URL}/update`, {
            electionId: '12345',
            slogan: 'Cambio real, futuro brillante.',
            text: 'Nuestra visión es construir un mejor mañana.',
            user: 'user123',
            video: 'newvideo.mp4',
        });
        console.log('✅ Actualización de candidatura exitosa:', response.data);
    } catch (error) {
        console.error('❌ Error en la actualización de candidatura:', error.response?.data || error.message);
    }
};

// Probar búsqueda de candidaturas
export const testSearchCandidacy = async () => {
    try {
        const response = await axios.post(`${API_URL}/search`, {
            electionId: '12345',
            slogan: 'futuro',
        });
        console.log('✅ Búsqueda de candidaturas exitosa:', response.data);
    } catch (error) {
        console.error('❌ Error en la búsqueda de candidaturas:', error.response?.data || error.message);
    }
};

// Probar consulta de una candidatura específica
export const testConsultCandidacy = async () => {
    try {
        const response = await axios.post(`${API_URL}/consult`, {
            id: 'candidacy123',
        });
        console.log('✅ Consulta de candidatura exitosa:', response.data);
    } catch (error) {
        console.error('❌ Error en la consulta de candidatura:', error.response?.data || error.message);
    }
};
