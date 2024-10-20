import { useSelector } from 'react-redux';
import { selectIsLoading, selectVisibleProducts } from '../redux/product/selectors.js';

export const useSearch = () => {
	const products = useSelector(selectVisibleProducts);
	const loading = useSelector(selectIsLoading);

	return { products, loading };
}
