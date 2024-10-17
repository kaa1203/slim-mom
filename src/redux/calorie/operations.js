import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://slim-mom-api.onrender.com/api/';

axios.defaults.baseURL = BASE_URL;

const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const caloriePublic = createAsyncThunk(
	'calorie/public',
	async(
    { height, currentWeight, age, desiredWeight, bloodType },
    thunkAPI
  ) => {
		try {

			const res = await axios.post('calorieIntake/public', {
				height,
				currentWeight,
				age,
				desiredWeight,
        bloodType,
			});
			setAuthHeader(res.data.token);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
);

export const caloriePrivate = createAsyncThunk(
	'calorie/public',
	async(
		{
			height,
			currentWeight,
			age,
			desiredWeight,
			bloodType
		} , thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.user.user.token;
			const res = await axios.post('calorieIntake/private',
				{
					height,
					currentWeight,
					age,
					desiredWeight,
          bloodType,
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			setAuthHeader(res.data.token);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
)
