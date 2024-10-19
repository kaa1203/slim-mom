import { useSelector } from 'react-redux';
import { selectEntry, selectError, selectIsLoading } from '../redux/entry/selectors.js';

export const useGetEntry = () => {
	const entryIsLoading = useSelector(selectIsLoading);
	const entry = useSelector(selectEntry);
	const entryError = useSelector(selectError);

	return { entry, entryIsLoading, entryError };
}
