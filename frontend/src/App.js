import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './components/Users/Register';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Users/Login';
import Dashboard from './components/Users/Dashboard';
import PrivateNavbar from './components/Navbars/PrivateNavbar';
import PublicNavbar from './components/Navbars/PublicNavbar';
import { useAuth } from './AuthContext/AuthContext';
import AuthRoute from './components/AuthRoute/AuthRouth';
import AIContentGenerator from './components/AIContentGeneration/GenerateContent';
import PricingPlans from './components/Plan/PricingPlan';
import FreePlanSubscription from './components/StripePayment/FreePlanSubscription';
import CheckoutForm from './components/StripePayment/CheckoutForm';
import VerifyPayment from './components/StripePayment/VerifyPayment';
import GenerationHistory from './components/Users/ContentHistory';
import AppFeatures from './components/Features/Features';
import AboutUs from './components/About/About';

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
					<Route
						path="/dashboard"
						element={
							<AuthRoute>
								<Dashboard />
							</AuthRoute>
						}
					/>
					<Route
						path="/generate-content"
						element={
							<AuthRoute>
								<AIContentGenerator />
							</AuthRoute>
						}
					/>

					<Route
						path="/generate-history"
						element={
							<AuthRoute>
								<GenerationHistory />
							</AuthRoute>
						}
					/>

					<Route
						path="/free-plan"
						element={
							<AuthRoute>
								<FreePlanSubscription />
							</AuthRoute>
						}
					/>

					<Route
						path="check-out/:plan"
						element={
							<AuthRoute>
								<CheckoutForm />
							</AuthRoute>
						}
					/>

					<Route path="/plans" element={<PricingPlans />} />
					<Route path="/features" element={<AppFeatures />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/success" element={<VerifyPayment />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
