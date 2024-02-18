const getToken = (req) => {
	// Get the token from the Authorization header
	const authHeader = req?.headers?.authorization;
	if (authHeader && authHeader.startsWith('Bearer ')) {
		// Extract and return the token part
		return authHeader.split(' ')[1];
	}
	// Return null if no token is present
	return null;
};

module.exports = getToken;
