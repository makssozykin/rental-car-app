import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

axios.defaults.params = {
  limit: 25,
  orientation: 'landscape',
};

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (query, thunkAPI) => {
    try {
      const res = await axios.get('/cars', {
        params: {
          ...query,
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getCarById',
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const res = await axios.get(`/cars/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getCarById = async id => {
//   try {
//     const res = await axios.get(`/cars/${id}`);
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     return error.message;
//   }
// };

export const getCarsBrand = createAsyncThunk(
  'cars/getBrands',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/brands');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
