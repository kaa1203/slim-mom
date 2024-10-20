import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './operations.js';

const handleOnPending = state => {
	state.isLoading = true;
}

const handleOnReject = (state, action) => {
	state.isLoading = false;
	state.error = action.payload
}

const productSlice = createSlice({
	name: 'product',
	initialState: {
		items: [],
		isLoading: false,
		isError: null,
		search: ''
	},
	reducers: {
		searchProducts: (state, action) => {
			state.search = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, handleOnPending)
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.items = action.payload;
				state.isError = false;
				state.isLoading = false;
			})
			.addCase(fetchProducts.rejected, handleOnReject)
	}
});

export const { searchProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
