import CandidacyRepository from '../repositories/CandidacyRepository.js';
import { validateString, validateBoolean } from '../utils/utils.js';
import { service_user_search } from './user.service.js';

const candidacyRepository = new CandidacyRepository();

export const service_create_candidacy = async (candidacy) => {
    await validateString(candidacy.slogan);
    await validateString(candidacy.text);
    if (candidacy.video) {
        await validateString(candidacy.video);
    }
    if (!candidacy.electionId) {
        throw new Error('La candidatura es obligatoria.');
    }
    if (!candidacy.user) {
        throw new Error('El usuario es obligatorio.');
    }

    const params = {};
    params.electionId = candidacy.electionId;
    params.user = candidacy.user;
    const existingCandidacy = await candidacyRepository.findByParams(params);
    if (existingCandidacy) {
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

    await validateString(candidacy.slogan);
    await validateString(candidacy.text);
    await validateString(candidacy.video);
    await validateBoolean(candidacy.approved);

    return await candidacyRepository.update(candidacy.id, candidacy);
};

export const service_search_candidacy = async (candidacy) => {
    const params = {};

    if (candidacy.electionId) {
        params.electionId = candidacy.electionId;
    }
    if (candidacy.slogan) {
        await validateString(candidacy.slogan);
        params.slogan = { $regex: new RegExp(candidacy.slogan, 'i') };
    }

    const candidacies = await candidacyRepository.findByParams(params);
    if (candidacies.length === 0) {
        const users = service_user_search(candidacy.email, candidacy.name, candidacy.surname);
        if (users.length === 1) {
            params.email = validator.escape(users[0].email);
            candidacies = await candidacyRepository.findByParams(params);
        }
    }

    if (candidacies.length === 0) {
        throw new Error('No se han encontrado candidaturas.');
    }

    return candidacies;
};

export const service_consult_candidacy = async (id) => {
    if (id == null) {
        throw new Error('El ID de la candidatura es obligatorio.');
    }

    const foundCandidacy = await candidacyRepository.findById(id);
    if (!foundCandidacy) {
        throw new Error('La candidatura no existe.');
    }

    return foundCandidacy;
};
