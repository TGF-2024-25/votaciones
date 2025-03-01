import express from 'express';
import { login, register, logout, deleteUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/deleteUser', deleteUser);
router.post('/updateUser', updateUser);

export default router;