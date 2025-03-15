import validator from 'validator';

export const validateEmail = async (email) => {
    if (!validator.isEmail(email)) {
        throw new Error('Formato de correo inválido');
    }
}

export const validateString = async (string) => {
    if (typeof string !== 'string' || !/^[a-zA-Z0-9áéíóúÁÉÍÓÚ!¡¿?.,\s]+$/.test(string)) {
        throw new Error('Formato de la cadena ' + string + ' inválido');
    }
};

export const validateBoolean = async (boolean) => {
    if (typeof boolean !== 'boolean') {
        throw new Error('La variable no es booleana');
    }
}