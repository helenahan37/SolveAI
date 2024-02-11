import { useAuth } from '../../AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import AuthCheckingAlert from '../Alert/AuthCheckingAlert';

const AuthRoute = ({ children }) => {
	const location = useLocation();
	const { isAuthenticated, isLoading, isError } = useAuth();
	if (isLoading) {
		return <AuthCheckingAlert />;
	}
	if (isError || !isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
};

export default AuthRoute;
