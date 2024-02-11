const express = require('express');
const { register, login, logout, userProfile, checkAuth } = require('../controllers/UsersController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const usersRouter = express.Router();

usersRouter
	.post('/register', register)
	.post('/login', login)
	.post('/logout', logout)
	.get('/profile', isAuthenticated, userProfile)
	.get('/auth/check', isAuthenticated, checkAuth);

module.exports = usersRouter;
