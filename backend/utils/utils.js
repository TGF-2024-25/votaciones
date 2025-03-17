import validator from 'validator';

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
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ0-9.@=¿?¿!\s]+$/.test(string)) {
        throw new Error(string + ' debe estar compuesto por letras, numeros, espacios, o los carácteres especiales .@=¿?¿!');
    }
}