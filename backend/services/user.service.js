import User from '../models/User.js';
import UserRepository from '../repositories/UserRepository.js';

export const loginUser = async (email, passworkd) => {
    const user = UserRepository.findById(email);
    if (!user){
        throw new Error('Usuario no encontrado');
    } 

    const passwordCorrect = true; // TODO
    if (!passwordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    return; // TODO
};

export const registerUser = async (email, name, photo, password) => {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('El usuario ya está registrado.');
    }

    // TODO gestionar contraseña
    const newUser = new User(name, email, photo);
    return await UserRepository.create(newUser);
};

export const deleteUser = async (email, password) => {
    const existingUser = await UserRepository.findByEmail(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    // TODO comprobar contraseña
    return await UserRepository.delete(email);
};

export const updateUser = async (email, name, photo, password) => {
    const existingUser = await UserRepository.findByEmail(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    // TODO comprobar y gestionar contraseña
    const newUser = new User(name, email, photo);
    return await UserRepository.update(id, newUser);
};