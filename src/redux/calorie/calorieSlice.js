import { createSlice } from '@reduxjs/toolkit';
import { caloriePrivate, caloriePublic } from './operations.js';

const handleOnPending = state => {
  state.isLoading = true;
  state.isError = null;
};

const handleOnReject = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

const calorieSlice = createSlice({
  name: 'calorie',
  initialState: {
    items: {},
    isLoading: false,
    isError: null,
  },
  extraReducers: builder => {
    builder
      .addCase(caloriePublic.pending, handleOnPending)
      .addCase(caloriePublic.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.isError = null;
        console.log(action.payload);
      })
      .addCase(caloriePublic.rejected, handleOnReject)
      .addCase(caloriePrivate.pending, handleOnPending)
      .addCase(caloriePrivate.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.isError = null;
        console.log(action.payload);
      })
      .addCase(caloriePrivate.rejected, handleOnReject);
  },
});

export const calorieReducer = calorieSlice.reducer;
