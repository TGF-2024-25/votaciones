import { service_user_login, service_user_register, service_user_delete, service_user_update, service_user_search, 
    service_user_consult } from '../services/user.service.js'

export const controller_user_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await service_user_login(email, password);

        res.status(200).json({
            message: 'Login exitoso',
            user,
            token // Enviar el token al frontend
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_user_register = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;
        const { user, token } = await service_user_register(name, surname, email, password);
        
        res.status(201).json({
            message: 'Usuario registrado con éxito',
            user,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_user_logout = async (req, res) => {
    // TODO
};

export const controller_user_delete = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await service_user_delete(email, password);
        res.status(201).json({ message: 'Usuario eliminado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_user_update = async (req, res) => {
    try {
        const { email, oldPassword, name, surname, photo, password } = req.body;
        const newUser = await service_user_update(email, oldPassword, name, surname, photo, password);
        res.status(201).json({ message: 'Usuario modificado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_user_search = async (req, res) => {
    try {
        const { email, name , surname} = req.body;
        const users = await service_user_search(email, name, surname);
        res.status(201).json({ message: 'Usuarios buscados con éxito', users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_user_consult = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await service_user_consult(email);
        res.status(201).json({ message: 'Usuario buscado con éxito', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};