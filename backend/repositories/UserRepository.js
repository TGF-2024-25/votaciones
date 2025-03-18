import BaseRepository from './BaseRepository.js';
import User from '../models/User.js';


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

    async delete(id) {
        try {
            const user = await User.findByPk(id);
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

    async findById(id) {
        try {
            const user = await User.findByPk(id);
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

    async update(id, entity) {
        try {
            const user = await User.findByPk(id);
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
    
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email: email } });
            return user; 
        }  
        catch (error) {
            console.error('Error al buscar el usuario por email:', error);
            throw error;
        }
    }
}