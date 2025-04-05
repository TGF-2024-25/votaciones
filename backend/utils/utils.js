import validator from 'validator';
import jwt from 'jsonwebtoken';

export const validateEmail = async (email) => {
    await validateString(email);
    if (!validator.isEmail(email)) {
        throw new Error('Formato de correo inválido');
    }
}

export const validateString = async (string) => {
    if (typeof string !== 'string') {
        throw new Error(string + ' no es una cadena');
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ0-9.@=¿?¿¡!\s]+$/.test(string)) {
        throw new Error(string + ' debe estar compuesto por letras, numeros, espacios, o los carácteres especiales .@=¿?¿!');
    }
}

export const validateBoolean = async (booleano) => {
    if (typeof booleano !== 'boolean') {
        throw new Error('La variable no es booleana');
    }
}

export const validateDate = async (dateString) => {
    await validateString(dateString);
    if (typeof string !== 'string') {
        throw new Error(string + ' no es una cadena');
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        throw new Error('El formato de fecha debe ser DD/MM/YYYY');
    }
}
export const generateToken = async (user) => {
    return jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
}
