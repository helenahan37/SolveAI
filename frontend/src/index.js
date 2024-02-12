import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext/AuthContext';

//stripe promise
const stripePromise = loadStripe(
	'pk_test_51ODPBOANAApTjoiFhATiKXu4KqU76ryXN2Uq08pdwtTeUt5BSxnDg0m2ZR48LLf75msk2MZ0seB7BXpheP8jOd9l00pkeMSpbg'
);
const options = {
	mode: 'payment',
	currency: 'usd',
	amount: 500,
};

const root = ReactDOM.createRoot(document.getElementById('root'));

//* React query client
const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Elements stripe={stripePromise} options={options}>
					<App />
				</Elements>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);

reportWebVitals();
