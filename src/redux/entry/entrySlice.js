import { createSlice } from "@reduxjs/toolkit";
import { fetchEntriesByDate, addEntry, deleteEntry, fetchAllEntries } from "./operation.js";

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
			})
			.addCase(fetchEntriesByDate.rejected, handleOnReject)
			.addCase(addEntry.pending, handleOnPending)
			.addCase(addEntry.fulfilled, (state, action) => {
				state.items.push(action.payload);
				state.isLoading = false;
				state.isError = null;
			})
			.addCase(addEntry.rejected, handleOnReject)
			.addCase(deleteEntry.pending, handleOnPending)
			.addCase(deleteEntry.fulfilled, (state, action) => {
				console.log(action.payload);
			})
			.addCase(fetchAllEntries.rejected, handleOnPending)
			.addCase(fetchAllEntries.fulfilled, (state, action) => {

			})
			.addCase(fetchAllEntries.rejected, handleOnReject);
	}
});

export const entryReducer = entrySlice.reducer;