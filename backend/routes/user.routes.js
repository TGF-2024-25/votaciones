import express from 'express';
import { controller_user_login, controller_user_register, controller_user_logout, controller_user_delete, 
    updacontroller_user_update, updacontroller_user_search, updacontroller_user_consult } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', controller_user_login);
router.post('/register', controller_user_register);
router.post('/logout', controller_user_logout);
router.post('/deleteUser', controller_user_delete);
router.post('/updateUser', updacontroller_user_update);
router.post('/searchUsers', updacontroller_user_search);
router.post('/consultUser', updacontroller_user_consult);

export default router;