import { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthAPI } from '../apis/user/usersAPI';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	//Make request using react query
	const { isError, isLoading, data, isSuccess } = useQuery({
		queryFn: checkAuthAPI,
		queryKey: ['checkAuth'],
	});
	//update the authenticated user

	useEffect(() => {
		if (isSuccess && data) {
			setIsAuthenticated(data.isAuthenticated);
		}
	}, [isSuccess, data]);

	//Update the user auth after login
	const login = () => {
		setIsAuthenticated(true);
	};
	//Update the user auth after login
	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

//Custom hook
export const useAuth = () => {
	return useContext(AuthContext);
};
