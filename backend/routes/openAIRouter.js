const express = require('express');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { openAIController } = require('../controllers/openAIController');
const { checkRequestLimit } = require('../middlewares/checkRequestLimit');

const openAIRouter = express.Router();

openAIRouter.post('/generate-content', isAuthenticated, checkRequestLimit, openAIController);

module.exports = openAIRouter;
