import { useSelector } from "react-redux";
import { selectCalorie, selectCalorieIsError, selectCalorieIsLoading, selectLatestCalculation } from "../redux/calorie/selectors.js";

export const useGetCalorieIntake = () => {
	const result = useSelector(selectCalorie);
	const calorieError = useSelector(selectCalorieIsError);
	const calorieIsLoading = useSelector(selectCalorieIsLoading);
	const calculation = useSelector(selectLatestCalculation)
	
	return { result, calorieError, calorieIsLoading, calculation };
}
