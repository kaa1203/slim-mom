import { useSelector } from 'react-redux';
import { selectError, selectIsLoggedIn, selectUser } from '../redux/auth/selectors.js';

export const useAuth = () => {
	const user = useSelector(selectUser);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const error = useSelector(selectError);

	return { user, isLoggedIn, error}
}
