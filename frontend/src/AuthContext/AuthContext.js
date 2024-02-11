import { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthAPI } from '../apis/user/usersAPI';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	//make react query request
	const { isError, isLoading, data, isSuccess } = useQuery({
		queryFn: checkAuthAPI,
		queryKey: ['checkAuth'],
	});
	useEffect(() => {
		if (isSuccess) {
			setIsAuthenticated(data);
		}
	}, [data, isSuccess]);

	//update userAuth state
	const login = () => {
		setIsAuthenticated(true);
	};

	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

//custom auth hook
export const useAuth = () => {
	return useContext(AuthContext);
};
