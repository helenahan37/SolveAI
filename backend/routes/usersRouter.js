const express = require('express');
const { register, login } = require('../controllers/UsersController');
const usersRouter = express.Router();

usersRouter.post('/register', register).post('/login', login);

module.exports = usersRouter;
