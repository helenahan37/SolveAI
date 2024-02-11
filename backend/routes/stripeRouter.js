const express = require('express');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { handlePayment, handleFreeSubscription, verifyPayment } = require('../controllers/handleStripePayment');
const stripeRouter = express.Router();

stripeRouter
	.post('/checkout', isAuthenticated, handlePayment)
	.post('/free-plan', isAuthenticated, handleFreeSubscription)
	.post('/verify-payment/:paymentId', isAuthenticated, verifyPayment);

module.exports = stripeRouter;
