import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/User.js';
import UserRepository from '../repositories/UserRepository.js';
import {validateEmail, validateString} from '../utils/utils.js'

const userRepository = new UserRepository();

export const service_user_login = async (email, password) => {
    await validateEmail(email);

    const user = await userRepository.findById(email);
    if (!user){
        throw new Error('Usuario no encontrado');
    } 

    const passwordCorrect = verifyPassword(password, user.password)
    if (!passwordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    return user;
};

export const service_user_register = async (email, name, photo, password) => {
    await validateEmail(email);

    const existingUser = await userRepository.findById(email);
    if (existingUser) {
        throw new Error('El usuario ya está registrado.');
    }

    await validateString(name);

    const hashedPassword = await hashPassword(password);
    const newUser = {
        email: email,
        name: name,
        photo: photo,
        password: hashedPassword
    }
    return await userRepository.create(newUser);
};

export const service_user_delete = async (email, password) => {
    await validateEmail(email);

    const existingUser = await userRepository.findById(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    const passwordCorrect = verifyPassword(password, existingUser.password)
    if (!passwordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    return await userRepository.delete(email);
};

export const service_user_update = async (email, oldPassword, name, photo, newPassword) => {
    await validateEmail(email);

    const existingUser = await userRepository.findById(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    const passwordCorrect = verifyPassword(oldPassword, existingUser.password)
    if (!passwordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    const hashedPassword = existingUser.password;
    if (newPassword) {
        hashedPassword = await hashPassword(password);
    }

    await validateString(name);
    
    const newUser = new User(name, email, photo, hashedPassword);
    return await userRepository.update(id, newUser);
};

export const service_user_search = async (email, name) => {
    const params = {};
    
    if (email) {
        await validateEmail(email);
        params.email = validator.escape(email);
    }

    if (name) {
        await validateString(name);
        params.name = { $regex: new RegExp(validator.escape(name), 'i') };
    }

    const users = await userRepository.findByParams(params);
    if (users.length === 0) {
        throw new Error('No se ha encontrado ningun usuario');
    }

    return users;
};

export const service_user_consult = async (email) => {
    await validateEmail(email);
    
    const user = await userRepository.findById(validator.escape(email));
    if (!user) {
        throw new Error('El usuario no existe.');
    }

    return user;
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    if (!password) {
        throw new Error('Se debe especificar una contraseña');
    }
    return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
    if (!password) {
        throw new Error('Se debe especificar una contraseña');
    }
    return await bcrypt.compare(password, hash);
};