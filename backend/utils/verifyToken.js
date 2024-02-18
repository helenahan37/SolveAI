const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		return decoded;
	} catch (err) {
		return false;
	}
};

module.exports = verifyToken;
