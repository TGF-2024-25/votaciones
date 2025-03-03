import { service_user_login, service_user_register, service_user_delete, service_user_update } from '../services/user.service.js'

export const controller_user_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await service_user_login(email, password);
        res.status(201).json({ message: 'Usuario logeado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_user_register = async (req, res) => {
    try {
        const { email, name, photo, password } = req.body;
        const newUser = await service_user_register(email, name, photo, password);
        res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
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

export const updacontroller_user_update = async (req, res) => {
    try {
        const { email, name, photo, password } = req.body;
        const newUser = await service_user_update(email, name, photo, password);
        res.status(201).json({ message: 'Usuario modificado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};