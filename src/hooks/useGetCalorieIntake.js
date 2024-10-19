import { useSelector } from 'react-redux';
import { selectCalorieIsError, selectCalorieIsLoading, selectCalorieItems } from '../redux/calorie/selectors.js';

export const useGetCalorieIntake = () => {
	const result = useSelector(selectCalorieItems);
	const calorieError = useSelector(selectCalorieIsError);
	const calorieIsLoading = useSelector(selectCalorieIsLoading);

	return { result, calorieError, calorieIsLoading };
}
