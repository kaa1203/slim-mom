import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://slim-mom-api.onrender.com/api/';

axios.defaults.baseURL = BASE_URL;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const validateData = (data) => {
  const { height, currentWeight, age, desiredWeight, bloodType } = data;

  // Ensure none of the required fields are empty
  if (!height || !currentWeight || !age || !desiredWeight || !bloodType) {
    throw new Error('All fields are required');
  }
};

export const caloriePublic = createAsyncThunk(
  'calorie/public',
  async({ height, currentWeight, age, desiredWeight, bloodType }, thunkAPI) => {
    try {
      // Validate input data
      validateData({ height, currentWeight, age, desiredWeight, bloodType });

      // If validation passes, proceed with the API request
      const res = await axios.post('calorieIntake/public', {
        height,
        currentWeight,
        age,
        desiredWeight,
        bloodType
      });
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      if (e.message === 'All fields are required') {
        return thunkAPI.rejectWithValue(e.message); // Reject if validation fails
      }
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Unknown error');
    }
  }
);

export const caloriePrivate = createAsyncThunk(
  'calorie/private',
  async({ height, currentWeight, age, desiredWeight, bloodType }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.user.token;

      // Validate input data
      validateData({ height, currentWeight, age, desiredWeight, bloodType });

      // If validation passes, proceed with the API request
      const res = await axios.post('calorieIntake/private',
        {
          height,
          currentWeight,
          age,
          desiredWeight,
          bloodType
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
      if (e.message === 'All fields are required') {
        return thunkAPI.rejectWithValue(e.message); // Reject if validation fails
      }
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Unknown error');
    }
  }
);

export const fetchAllCalculations = createAsyncThunk(
	'entries/fetchAllCalculations',
	async(_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
      	const token = state.auth.user.user.token;
			const res = await axios.get('calorieIntake/private', {
				headers: {
				 'Authorization': `Bearer ${token}`,
				 'Content-Type': 'application/json',
				}
			});
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
)