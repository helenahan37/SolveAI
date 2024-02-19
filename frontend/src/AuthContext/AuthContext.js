import { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthAPI } from '../apis/user/usersAPI';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	//Make request using react query
	const { isError, isLoading, isSuccess } = useQuery({
		queryFn: checkAuthAPI,
		queryKey: ['checkAuth'],
	});
	//update the authenticated user

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const data = await checkAuthAPI();
					setIsAuthenticated(data.isAuthenticated);
				} catch (error) {
					console.error('Auth check failed', error);
					setIsAuthenticated(false);
					localStorage.removeItem('token');
				}
			}
		};
		checkAuth();
	}, []);

	//Update the user auth after login
	const login = () => {
		setIsAuthenticated(true);
		localStorage.setItem('isAuthenticated', 'true');
	};
	//Update the user auth after login
	const logout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('isAuthenticated');
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
