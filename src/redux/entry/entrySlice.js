import { createSlice } from "@reduxjs/toolkit";
import { fetchEntriesByDate } from "./operation.js";

const handleOnPending = state => {
	state.isLoading = false;
}

const handleOnReject = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
}

const entrySlice = createSlice({
	name: 'entry',
	initialState: {
		items: [],
		isLoading: false,
		isError: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchEntriesByDate.pending, handleOnPending)
			.addCase(fetchEntriesByDate.fulfilled, (state, action) => {
				state.items = action.payload;
				state.isLoading = false;
				state.isError = null;
				console.log(action.payload);
			})
			.addCase(fetchEntriesByDate.rejected, handleOnReject)
	}
});

export const entryReducer = entrySlice.reducer;