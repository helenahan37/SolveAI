const express = require('express');
const { register, login, logout, userProfile, checkAuth } = require('../controllers/usersController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { deleteContent } = require('../controllers/contentController');

const usersRouter = express.Router();

usersRouter
	.post('/register', register)
	.post('/login', login)
	.post('/logout', logout)
	.get('/profile', isAuthenticated, userProfile)
	.get('/auth/check', isAuthenticated, checkAuth)
	.delete('/content-delete/:contentId', isAuthenticated, deleteContent);

module.exports = usersRouter;
