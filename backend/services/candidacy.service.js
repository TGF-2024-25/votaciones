import CandidacyRepository from '../repositories/CandidacyRepository.js';
import { validateString, validateBoolean } from '../utils/utils.js';

const candidacyRepository = new CandidacyRepository();

export const service_create_candidacy = async (candidacy) => {
    await validateString(candidacy.slogan);
    await validateString(candidacy.text);
    await validateString(candidacy.video);
    if (!candidacy.electionId) {
        throw new Error('La candidatura es obligatoria.');
    }
    if (!candidacy.user) {
        throw new Error('El usuario es obligatorio.');
    }

    const params = {};
    params.electionId = candidacy.electionId;
    params.user = user;
    const existingCandidacy = await candidacyRepositoryRepository.findByParams(params);
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
    if (!candidacy.id) {
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

    if (candidacy.id) {
        params.id = candidacy.id;
    }
    if (candidacy.electionId) {
        params.electionId = candidacy.electionId;
    }
    if (candidacy.slogan) {
        await validateString(candidacy.slogan);
        params.slogan = { $regex: new RegExp(candidacy.slogan, 'i') };
    }
    if (candidacy.text) {
        await validateString(candidacy.text);
        params.text = { $regex: new RegExp(candidacy.text, 'i') };
    }
    if (candidacy.user) {
        params.user = candidacy.user;
    }
    if (candidacy.video) {
        await validateString(candidacy.video);
        params.video = candidacy.video;
    }
    if (candidacy.approved) {
        await validateBoolean(candidacy.approved);
        params.approved = candidacy.approved;
    }

    const candidacies = await candidacyRepository.findByParams(params);
    if (candidacies.length === 0) {
        throw new Error('No se han encontrado candidaturas.');
    }

    return candidacies;
};

export const service_consult_candidacy = async (candidacy) => {
    if (!candidacy.id) {
        throw new Error('El ID de la candidatura es obligatorio.');
    }

    const foundCandidacy = await candidacyRepository.findById(candidacy.id);
    if (!foundCandidacy) {
        throw new Error('La candidatura no existe.');
    }

    return foundCandidacy;
};
