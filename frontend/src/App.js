import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './components/Users/Register';
import Home from './components/Home/Home';
import Login from './components/Users/Login';
import Dashboard from './components/Users/Dashboard';
import PrivateNavbar from './components/Navbars/PrivateNavbar';
import PublicNavbar from './components/Navbars/PublicNavbar';
import { useAuth } from './AuthContext/AuthContext';

export default function App() {
	const { isAuthenticated } = useAuth();

	return (
		<>
			<BrowserRouter>
				{isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
