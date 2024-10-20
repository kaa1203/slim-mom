import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice.js';
import { productReducer } from './product/productSlice.js';
import { calorieReducer } from './calorie/calorieSlice.js';
import { entryReducer } from './entry/entrySlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
	 product: productReducer,
	 calorie: calorieReducer,
	 entry: entryReducer
  },
});

export default store;
