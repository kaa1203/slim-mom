import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { jwtcode} from 'jwt-decode';
// import { toast } from 'react-toastify';

const BASE_URL = 'https://slim-mom-api.onrender.com/api/';
axios.defaults.baseURL = BASE_URL;

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
//to SignUP
export const signup = createAsyncThunk(
  'users/signup',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post('users/signup', { name, email, password });
      setAuthHeader(res.data.token);
      // toast.success(
      //   'Account created! Verification has been sent to your email'
      // );
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.status);
    }
  }
);

export const signin = createAsyncThunk(
  'users/signin',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/users/signin', { email, password });
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      // // const status = error.response?.status;
      // // const message = error.response?.data?.message || error.message;

      // if (status === 409 && message === 'Email already registered') {
      //   toast.error('Email is already in use.');
      // }
      return thunkAPI.rejectWithValue(e.response.status);
    }
  }
);

export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user.user.token;
    const res = await axios.get('/users/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});
