import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

const useCitiesContext = function () {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error('CitiesContext was used outside the CitiesProvider');

	return context;
};

export default useCitiesContext;
