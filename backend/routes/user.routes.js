import express from 'express';
import multer from 'multer';
import { controller_user_login, controller_user_register, controller_user_logout, controller_user_delete, 
    controller_user_update, controller_user_search, controller_user_consult, controller_upload_file, upload } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', controller_user_login);
router.post('/register', controller_user_register);
router.post('/logout', controller_user_logout);
router.post('/deleteUser', controller_user_delete);
router.post('/updateUser', controller_user_update);
router.post('/searchUser', controller_user_search);
router.post('/consultUser', controller_user_consult);
router.post('/uploadFile', upload.single('file'), controller_upload_file);

export default router;