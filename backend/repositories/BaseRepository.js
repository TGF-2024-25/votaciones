export default class BaseRepository {
    constructor() {
        if (new.target === BaseRepository) {
            throw new Error('No se puede instanciar la clase BaseRepository.');
        }
    }

    async create(entity) {
        throw new Error('Método create() debe ser implementado.');
    }

    async delete(id) {
        throw new Error('Método delete() debe ser implementado.');
    }

    async findById(id) {
        throw new Error('Método findById() debe ser implementado.');
    }

    async findAll() {
        throw new Error('Método findAll() debe ser implementado.');
    }

    async update(id, entity) {
        throw new Error('Método update() debe ser implementado.');
    }

}
  