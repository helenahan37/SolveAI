const express = require('express');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { openAIController } = require('../controllers/openAIController');

const openAIRouter = express.Router();

openAIRouter.post('/generate-content', isAuthenticated, openAIController);

module.exports = openAIRouter;
