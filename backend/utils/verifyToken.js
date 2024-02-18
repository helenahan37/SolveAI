const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (err) {
		return false;
	}
};

module.exports = verifyToken;
