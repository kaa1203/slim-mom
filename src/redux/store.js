import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.js'; // Update this path according to your folder structure

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
