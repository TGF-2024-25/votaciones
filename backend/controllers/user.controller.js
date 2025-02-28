import { loginUser } from '../services/user.service'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await loginUser(email, password);
        res.status(201).json({ message: 'Usuario logeado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { email, name, photo, password } = req.body;
        const newUser = await registerUser(email, name, photo, password);
        res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    // TODO
};

export const deleteUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await deleteUser(email, password);
        res.status(201).json({ message: 'Usuario eliminado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email, name, photo, password } = req.body;
        const newUser = await updateUser(email, name, photo, password);
        res.status(201).json({ message: 'Usuario modificado con éxito', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};