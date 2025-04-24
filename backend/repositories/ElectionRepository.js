import BaseRepository from './BaseRepository.js';
import Election from '../models/Election.js';

export default class ElectionRepository extends BaseRepository {
    constructor() {
        super();
    }

    async create(entity) {
        try {
            const newElection = await Election.create(entity);
            return newElection;
        } catch (error) {
            console.error('Error al crear la elección:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const election = await Election.findByPk(id);
            if (election) {
                await election.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al eliminar la elección:', error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const election = await Election.findByPk(id);
            return election;
        } catch (error) {
            console.error('Error al buscar la elección por ID:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const elections = await Election.findAll();
            return elections;
        } catch (error) {
            console.error('Error al buscar todas las elecciones:', error);
            throw error;
        }
    }

    async findByParams(params) {
        try {
            const elections = await Election.findAll({ where: params });
            return elections;
        } catch (error) {
            console.error('Error al buscar elecciones con parámetros:', error);
            throw error;
        }
    }

    async update(id, entity) {
        try {
            const election = await Election.findByPk(id);
            if (election) {
                election.title = entity.title || election.title;
                election.image = entity.image || election.image;
                election.init_date = entity.init_date || election.init_date;
                election.end_date = entity.end_date || election.end_date;

                await election.save(); // Guarda los cambios
                console.log("Elección actualizada");
                return election;
            }
            return null;
        } catch (error) {
            console.error('Error al actualizar la elección:', error);
            throw error;
        }
    }
}
