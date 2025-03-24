import Candidacy from '../models/Candidacy.js';
import {
    service_create_candidacy,
    service_delete_candidacy,
    service_update_candidacy,
    service_search_candidacy,
    service_consult_candidacy,
} from '../services/candidacy.service.js';

export const controller_create_candidacy = async (req, res) => {
    try {
        const { electionId, slogan, text, user, video } = req.body;
        const candidacy = {user, electionId, slogan, text, video, approved: false};
        console.log("Candidatura recibida: ", candidacy);
        const newCandidacy = await service_create_candidacy(candidacy);
        res.status(201).json({ message: 'Candidatura creada con éxito', newCandidacy });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_delete_candidacy = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw new Error('ID de candidatura es requerido');
        await service_delete_candidacy(id);
        res.status(200).json({ message: 'Candidatura eliminada con éxito' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_update_candidacy = async (req, res) => {
    try {
        const { electionId, slogan, text, user, video, id } = req.body;
        if (!id) throw new Error('ID de candidatura es requerido para actualizar');
        const candidacy = new Candidacy(id, user, electionId, slogan, text, video, false);
        candidacy.id = id; // Asignamos el ID para actualizar el registro
        const updatedCandidacy = await service_update_candidacy(candidacy);
        res.status(200).json({ message: 'Candidatura modificada con éxito', updatedCandidacy });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_search_candidacy = async (req, res) => {
    try {
        const { electionId, slogan, name, surname, email } = req.body;
        const candidacies = await service_search_candidacy(req.body);
        res.status(200).json({ message: 'Candidaturas encontradas con éxito', candidacies });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_consult_candidacy = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw new Error('ID de candidatura es requerido');
        const candidacyConsulted = await service_consult_candidacy(id);
        res.status(200).json({ message: 'Candidatura consultada con éxito', candidacyConsulted });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
