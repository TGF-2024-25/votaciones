import validator from 'validator';
import jwt from 'jsonwebtoken';

export const validateEmail = async (email) => {
    await validateString(email);
    if (!validator.isEmail(email)) {
        throw new Error('Formato de correo inválido');
    }
}

export const validateVideo = async (video) => {
    if (!video) {
      throw new Error('No se ha proporcionado ningún archivo.');
    }

    const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mov', 'video/avi', 'video/mkv'];
    if (!allowedMimeTypes.includes(video.mimetype)) {
      throw new Error(`El archivo proporcionado no es un vídeo válido. Tipo recibido: ${video.mimetype}`);
    }
  
    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
    if (video.size > maxSizeInBytes) {
      throw new Error('El vídeo es demasiado grande. Tamaño máximo permitido: 100MB.');
    }
};

export const validateString = async (string) => {
    if (typeof string !== 'string') {
        throw new Error(string + ' no es una cadena el string valido');
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ0-9\-+.@=¿?¿¡!\s]+$/.test(string)) {
        throw new Error(string + ' debe estar compuesto por letras, numeros, espacios, o los carácteres especiales .@=¿?¿!');
    }
}

export const validateBoolean = async (booleano) => {
    if (typeof booleano !== 'boolean') {
        throw new Error('La variable no es booleana');
    }
}

export const validateDate = async (dateString) => {
    //await validateString(dateString);
    
    if (typeof dateString !== 'string') {
        throw new Error(dateString + ' no es una cadena la fecha');
    }

    dateString = '1111-11-02T00:00:00.000Z'.split('T')[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error('El formato de fecha debe ser YYYY-MM-DD');
    }
}

export const generateToken = async (user) => {
    return jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
}
