import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://slim-mom-api.onrender.com/api/';

axios.defaults.baseURL = BASE_URL;

const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const fetchAllEntries = createAsyncThunk(
	'entries/fetchAllEntries',
	async(_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.user.user.token;
			const res = await axios.get(`entries/`,{
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			});
			setAuthHeader(res.data.token);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response);
		}
	}
);

export const fetchEntriesByDate = createAsyncThunk(
	'entries/fetchEntriesByDate',
	async(date, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.user.user.token;
			const res = await axios.get(`entries/${date}`,{
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			});
			setAuthHeader(res.data.token);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status)
		}
	}
);

export const addEntry = createAsyncThunk(
	'entries/addEntries',
	async({
		_id,
		categories,
		weight,
		title,
		calories,
		groupBloodNotAllowed,
		grams
	}, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.user.user.token;

			const res = await axios.post('entries/',
				{ _id,
					categories,
					weight,
					title,
					calories,
					groupBloodNotAllowed,
					grams
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					}
				}
			);
			setAuthHeader(res.data.token);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
)

export const deleteEntry = createAsyncThunk(
   'entries/deleteEntry',
	async(_id, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.user.user.token;

			await axios.delete(`entries/${_id}`,
				{
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					}
				}
			);
			return _id;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
)
