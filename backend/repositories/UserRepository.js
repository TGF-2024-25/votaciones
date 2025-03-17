import BaseRepository from './BaseRepository.js';

export default class UserRepository extends BaseRepository {

    constructor() {
        super();
    }

    async create(entity) {
        try {
            const newUser = await User.create(entity);
            return newUser;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }

    async delete(email) {
        try {
            const user = await User.findByPk(email);
            if (user) {
                await user.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            throw error;
        }
    }

    async findById(email) {
        try {
            const user = await User.findByPk(email);
            return user;
        } catch (error) {
            console.error('Error al buscar el usuario por ID:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error('Error al buscar todos los usuarios:', error);
            throw error;
        }
    }

    async update(email, entity) {
        try {
            const user = await User.findByPk(email);
            if (user) {
                await user.update(entity);
                return user;
            }
            return null;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }
}