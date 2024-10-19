import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://slim-mom-api.onrender.com/api/';

axios.defaults.baseURL = BASE_URL;

const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const signup = createAsyncThunk(
	'users/signup',
	async({ name, email, password }, thunkAPI) => {
		try {
			const res = await axios.post('users/signup', { name, email, password });
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
)

export const signin = createAsyncThunk(
	'users/signin',
	async({email, password}, thunkAPI) => {
		try {
			const res = await axios.post('/users/signin', { email, password });
			console.log(res.data);
			setAuthHeader(res.data.token);
			return res.data;

		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
);

export const logout = createAsyncThunk(
	'users/logout',
	async(_,thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.user.user.token;
			const res = await axios.get('/users/logout', {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
		  		}
			});
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
)
