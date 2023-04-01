const express = require('express');
const controller = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post('/register', controller.login);

authRoutes.post('/login', controller.login);

module.exports = authRoutes;