import validator from 'validator';

export const validateEmail = async (email) => {
    if (!validator.isEmail(email)) {
        throw new Error('Formato de correo inválido');
    }
}

export const validateString = async (string) => {
    if (typeof string !== 'string' || !/^[a-zA-ZáéíóúÁÉÍÓÚ!¡.\s]+$/.test(string)) {
        throw new Error('Formato de cadena inválido');
    }
};

export const validateBoolean = async (boolean) => {
    if (typeof boolean !== 'boolean') {
        throw new Error('La variable no es booleana');
    }
}