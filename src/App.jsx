import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import City from './components/City';
import { CitiesProvider } from './contexts/CitiesContext';

function App() {
	return (
		<CitiesProvider>
			<div>
				<BrowserRouter>
					<Routes>
						<Route index path="/" element={<Homepage />} />
						<Route path="product" element={<Product />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="login" element={<Login />} />
						<Route path="app" element={<AppLayout />}>
							<Route index element={<Navigate replace to="cities" />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</CitiesProvider>
	);
}

export default App;
