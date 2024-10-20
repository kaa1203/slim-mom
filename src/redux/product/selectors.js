import { createSelector } from '@reduxjs/toolkit';

export const selectProducts = state => state.product.items;
export const selectSearchValue = state => state.product.search;
export const selectIsLoading = state => state.product.isLoading;

export const selectVisibleProducts = createSelector(
	[selectSearchValue, selectProducts],
	(searchValue, products) => {

		if (!searchValue) return products;
		return products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));
	}
)
