import express from 'express';
import { controller_user_login, controller_user_register, controller_user_logout, controller_user_delete, updacontroller_user_update } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', controller_user_login);
router.post('/register', controller_user_register);
router.post('/logout', controller_user_logout);
router.post('/deleteUser', controller_user_delete);
router.post('/updateUser', updacontroller_user_update);

export default router;