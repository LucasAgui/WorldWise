import { useContext } from 'react';
import { AuthContext } from '../contexts/FakeAuthContext';

export default function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined)
		return new Error('AuthContext was used outside the AuthProvider');

	return context;
}
