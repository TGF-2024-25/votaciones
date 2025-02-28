const express = require('express');
const router = express.Router();
import { login, register, logout, deleteUser, updateUser } from '../controllers/vote.controller';

router.post('/login', login);
router.get('/register', register);
router.post('/logout', logout);
router.get('/deleteUser', deleteUser);
router.get('/updateUser', updateUser);

module.exports = router;
