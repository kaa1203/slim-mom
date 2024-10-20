import { createSlice } from '@reduxjs/toolkit';
import { logout, signin, signup } from './operations.js';

const handleOnPending = state => {
  state.isLoggedIn = false;
};

const handleOnReject = (state, action) => {
  state.isLoggedIn = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: '',
      name: '',
      token: '',
    },
    isLoggedIn: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, handleOnPending)
      .addCase(signup.fulfilled, (state, action) => {
      })
      .addCase(signup.rejected, handleOnReject)
      .addCase(signin.pending, handleOnPending)
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signin.rejected, handleOnReject)
      .addCase(logout.pending, handleOnPending)
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = '';
        state.error = null;
      });
  },
});

export const authReducer = authSlice.reducer;
