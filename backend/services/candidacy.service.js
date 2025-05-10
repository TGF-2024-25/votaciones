import CandidacyRepository from '../repositories/CandidacyRepository.js';
import { validateString, validateBoolean } from '../utils/utils.js';
import { service_user_search, service_user_consult } from './user.service.js';

const candidacyRepository = new CandidacyRepository();

export const service_create_candidacy = async (candidacy) => {
    await validateString(candidacy.slogan);
    await validateString(candidacy.text);
    if (candidacy.video) {
        await validateString(candidacy.video);
    }
    if (!candidacy.electionID) {
        throw new Error('El id de eleccion es obligatorio.');
    }
    if (!candidacy.user) {
        throw new Error('El usuario es obligatorio.');
    }

    const params = {};
    params.electionID = candidacy.electionID;
    params.user = candidacy.user;
    const existingCandidacy = await candidacyRepository.findByParams(params);
    if (existingCandidacy.length > 0) {
        throw new Error('Ya existe una candidatura para esta elección con este usuario.');
    }

    return await candidacyRepository.create(candidacy);
};

export const service_delete_candidacy = async (id) => {
    if (!id) {
        throw new Error('El ID de la candidatura es obligatorio.');
    }

    const existingCandidacy = await candidacyRepository.findById(id);
    if (!existingCandidacy) {
        throw new Error('La candidatura no existe.');
    }

    return await candidacyRepository.delete(id);
};

export const service_update_candidacy = async (candidacy) => {
    if (candidacy.id == null) {
        throw new Error('El ID de la candidatura es obligatorio.');
    }

    const existingCandidacy = await candidacyRepository.findById(candidacy.id);
    if (!existingCandidacy) {
        throw new Error('La candidatura no existe.');
    }

    if (typeof candidacy.slogan !== 'undefined') {
        await validateString(candidacy.slogan);
        existingCandidacy.slogan = candidacy.slogan;
    }
    if (typeof candidacy.text !== 'undefined') {
        await validateString(candidacy.text);
        existingCandidacy.text = candidacy.text;
    }
    if (typeof candidacy.video !== 'undefined') {
        // await validateString(candidacy.video); TODO
        // existingCandidacy.video = candidacy.video;
    }
    if (typeof candidacy.approved !== 'undefined') {
        await validateBoolean(candidacy.approved);
        existingCandidacy.approved = candidacy.approved;
    }

    return await candidacyRepository.update(candidacy.id, existingCandidacy);
};

export const service_search_candidacy = async (candidacy) => {
    const params = {};

    if (candidacy.electionID) {
        params.electionID = candidacy.electionID;
    }
    if (candidacy.slogan) {
        await validateString(candidacy.slogan);
        params.slogan = candidacy.slogan;
    }

    let candidacies = [];

    if (Object.keys(params).length !== 0) {
        candidacies = await candidacyRepository.findByParams(params);
    }
    
    const users = await service_user_search(candidacy.email, candidacy.name, candidacy.surname);
    if (candidacies.length > 0 && users.length === 1) {
        const userEmail = users[0].email;
        candidacies = candidacies.filter(c => c.user === userEmail);
    }

    return candidacies;
};

export const service_consult_candidacy = async (id) => {
    if (id == null) {
        throw new Error('El ID de la candidatura es obligatorio.');
    }

    let foundCandidacy = await candidacyRepository.findById(id);
    if (!foundCandidacy) {
        throw new Error('La candidatura no existe.');
    }

    foundCandidacy.user = await service_user_consult(foundCandidacy.user);
    if (!foundCandidacy.user) {
        throw new Error('Error al guardar la información del candidato.');
    }

    return foundCandidacy;
};
