const express = require('express');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { handlePayment } = require('../controllers/handleStripePayment');
const { handleFreeSubscription } = require('../controllers/handleStripePayment');
const stripeRouter = express.Router();

stripeRouter
	.post('/checkout', isAuthenticated, handlePayment)
	.post('/free-plan', isAuthenticated, handleFreeSubscription);

module.exports = stripeRouter;
