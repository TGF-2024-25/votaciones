// backend/routes/user.routes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/vote.controller');

// Ruta para emitir un voto
router.post('/login', UserController.login);

// Ruta para verificar un voto por usuario
router.get('/register', UserController.register);

module.exports = router;
