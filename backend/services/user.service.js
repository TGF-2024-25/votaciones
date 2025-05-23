import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import {Op} from 'sequelize';
import UserRepository from '../repositories/UserRepository.js';
import {validateEmail, validateString, generateToken} from '../utils/utils.js'

const userRepository = new UserRepository();

export const service_user_login = async (email, password) => {
    await validateEmail(email);
    const user = await userRepository.findById(email);
    if (!user){
        throw new Error('Usuario no encontrado');
    } 

    const passwordCorrect = await verifyPassword(password, user.password);
    if (!passwordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar token de inicio de sesion 
    const token = await generateToken(user);
    if (!token) {
        throw new Error('mal token');
    }
    return { user, token };
};

export const service_user_register = async (name, surname, email, password) => {
    await validateEmail(email);

    const existingUser = await userRepository.findById(email);
    if (existingUser) {
        throw new Error('El correo introducido ya está registrado.');
    }

    await validateString(name);
    await validateString(surname);

    const hashedPassword = await hashPassword(password);
    const newUser = {name: name, surname: surname, email: email, password: hashedPassword};

    // Crear el usuario en la base de datos
    const user = await userRepository.create(newUser);

    // Generar token de inicio de sesion 
    const token = await generateToken(user);

    console.log(token);

    return { user, token };
};



export const service_user_delete = async (email) => {
    await validateEmail(email);

    const existingUser = await userRepository.findById(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }

    return await userRepository.delete(email);
};

export const service_user_update = async (email, oldPassword, name, surname, photo, newPassword) => {

    await validateEmail(email);
    const existingUser = await userRepository.findById(email);
    if (!existingUser) {
        throw new Error('El usuario no existe.');
    }
    if(oldPassword) {
        const passwordCorrect = verifyPassword(oldPassword, existingUser.password)
        if (!passwordCorrect) {
            throw new Error('Contraseña incorrecta');
        }
        
    }

    let hashedPassword = existingUser.password;
    if (newPassword) {
        hashedPassword = await hashPassword(newPassword);
    }

    let newName = existingUser.name;
    if (name) {
        await validateString(name);
        newName = name;
    }

    let newSurname = existingUser.surname;
    if (surname) {
        await validateString(surname);
        newSurname = surname;
    }
    let newPhoto = existingUser.image;
    if (photo) {
        newPhoto = photo.filename;
    }
    const newUser = {name: newName, surname: newSurname, email: email, image: newPhoto, password: hashedPassword};
    const user = await userRepository.update(email, newUser)
    // Generar token de inicio de sesion 
    const token = await generateToken(user);
    if (!token) {
        throw new Error('mal token');
    }
    
    return { user, token };
};

export const service_user_search = async (email, name, surname) => {
    const params = {};
    
    if (email) {
        await validateEmail(email);
        params.email = validator.escape(email);
    }

    if (name) {
        await validateString(name);
        params.name = { [Op.like]: `%${validator.escape(name)}%` };
    }

    if (surname) {
        await validateString(surname);
        params.surname = { [Op.like]: `%${validator.escape(surname)}%` };
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