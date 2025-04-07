import BaseRepository from './BaseRepository.js';

export default class ElectionRepository extends BaseRepository {

    constructor() {
        super();
    }

    async create(entity) {
        throw new Error('Método create() debe ser implementado.');
    }

    async delete(id) {
        throw new Error('Método delete() debe ser implementado.');
    }

    async findById(id) {        //buscar por entidad en vez de id?
        throw new Error('Método findById() debe ser implementado.');
    }

    async findByParams(params) {
        throw new Error('Método findByParams() debe ser implementado.');
    }

    async update(entity, id) {
        throw new Error('Método update() debe ser implementado.');
    }
}