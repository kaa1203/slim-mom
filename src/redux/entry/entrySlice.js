import { createSlice } from '@reduxjs/toolkit';
import { addEntry, fetchEntriesByDate, deleteEntry } from './operation.js';

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
				console.log(action.payload);
			})
			.addCase(addEntry.rejected, handleOnReject)
			.addCase(deleteEntry.pending, handleOnPending)
			.addCase(deleteEntry.fulfilled, (state, action) => {
				const index = state.items.findIndex(entry => entry._id === action.payload);
				state.items.splice(index, 1);
				state.isLoading = false;
				state.isError = null;
				console.log(index);

			})
			.addCase(deleteEntry.rejected, handleOnReject)
	}
});

export const entryReducer = entrySlice.reducer;
