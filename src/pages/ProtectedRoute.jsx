import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuthContext();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate('/');
		},
		[isAuthenticated, navigate]
	);

	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
