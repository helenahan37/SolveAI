const express = require('express');
const { register } = require('../controllers/UsersController');
const usersRouter = express.Router();

usersRouter.post('/register', register);

module.exports = usersRouter;
