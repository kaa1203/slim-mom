import { createSelector } from "@reduxjs/toolkit";

export const selectEntry = state => state.entry.items;
export const selectIsLoading = state => state.entry.isLoading;
export const selectError = state => state.entry.error;

export const selectTotalCalories = createSelector(
	[selectEntry], entries => entries.reduce((total, entry) => total += entry.food.calories, 0))