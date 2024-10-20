import { createSelector } from '@reduxjs/toolkit';

export const selectCalorieState = state => state.calorie;
export const selectCalorie = state => state.calorie.items;
export const selectCalorieIsLoading = state => state.calorie.isLoading;
export const selectCalorieIsError = state => state.calorie.isError;
const selectCalculation = state => state.calorie.calculation;

export const selectLatestCalculation = createSelector(
  [selectCalculation],
  calculations => {
    return calculations.reduce((acc, calculation) => {
      return new Date(calculation.createdAt) > new Date(acc.createdAt)
        ? calculation
        : acc;
    }, calculations[0]);
  }
);
