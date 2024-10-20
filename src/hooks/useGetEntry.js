import { useSelector } from "react-redux";
import { selectIsLoading, selectEntry, selectError, selectTotalCalories } from "../redux/entry/selectors.js";

export const useGetEntry = () => {
	const entryIsLoading = useSelector(selectIsLoading);
	const entry = useSelector(selectEntry);
	const entryError = useSelector(selectError);
	const totalCalories = useSelector(selectTotalCalories);
	
	return { entry, entryIsLoading, entryError, totalCalories };
}
