import User from '../models/User.js';
import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

export const service_user_login = async (email, passworkd) => {
    const user = await userRepository.findById(email);
    if (!user){
        throw new Error('Usuario no encontrado');
    } 

    const passwordCorrect = true; // TODO
    if (!passwordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    return; // TODO
};

export const service_user_register = async (email, name, photo, password) => {
    const existingUser = await userRepository.findById(email);
    if (existingUser) {
        throw new Error('El usuario ya está registrado.');
    }

    // TODO gestionar contraseña
    const newUser = new User(name, email, photo);
    return await userRepository.create(newUser);
};

export const service_user_delete = async (email, password) => {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    // TODO comprobar contraseña
    return await userRepository.delete(email);
};

export const service_user_update = async (email, name, photo, password) => {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    // TODO comprobar y gestionar contraseña
    const newUser = new User(name, email, photo);
    return await userRepository.update(id, newUser);
};