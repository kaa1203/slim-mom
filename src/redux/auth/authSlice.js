import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isModalOpen: false, // Add this line to track modal state
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    // Add the updateModalStatus reducer
    updateModalStatus(state, action) {
      state.isModalOpen = action.payload; // Set modal open status
    },
  },
});

// Export actions
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  updateModalStatus, // Ensure this action is exported
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
