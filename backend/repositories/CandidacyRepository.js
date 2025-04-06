import BaseRepository from './BaseRepository.js';
import Candidacy from '../models/Candidacy.js';

export default class CandidacyRepository extends BaseRepository {
    constructor() {
        super();
    }

    async create(entity) {
        try {
            const newCandidacy = await Candidacy.create(entity);
            return newCandidacy;
        } catch (error) {
            console.error('Error al crear la candidatura:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const candidacy = await Candidacy.findByPk(id);
            if (candidacy) {
                await candidacy.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al eliminar la candidatura:', error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const candidacy = await Candidacy.findByPk(id);
            return candidacy;
        } catch (error) {
            console.error('Error al buscar la candidatura por ID:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const candidacies = await Candidacy.findAll();
            return candidacies;
        } catch (error) {
            console.error('Error al buscar todas las candidaturas:', error);
            throw error;
        }
    }

    async findByParams(params) {
        try {
            const candidacies = await Candidacy.findAll({ where: params });
            console.log('Candidaturas encontradas: ' + candidacies);
            return candidacies;
        } catch (error) {
            console.error('Error al buscar candidaturas con parámetros:', error);
            throw error;
        }
    }

    async update(id, entity) {
        try {
            const candidacy = await Candidacy.findByPk(id);
            if (candidacy) {
                await candidacy.update(entity);
                return candidacy;
            }
            return null;
        } catch (error) {
            console.error('Error al actualizar la candidatura:', error);
            throw error;
        }
    }
}
