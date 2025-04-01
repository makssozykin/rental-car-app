import { createSlice } from '@reduxjs/toolkit';
import { getCars, getCarsBrand } from './operations.js';

const initialState = {
  catalog: [],
  brands: [],
  query: {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
    limit: '',
    page: '',
  },
  errors: null,
  loading: false,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars(state, action) {
      state.catalog = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        console.log(action.payload);
        state.catalog = action.payload.cars;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.errors = action.error.message;
        state.loading = false;
      })
      .addCase(getCarsBrand.pending, handlePending)
      .addCase(getCarsBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(getCarsBrand.rejected, (state, action) => {
        state.errors = action.error.message;
        state.loading = false;
      });
  },
});

export const { setCars } = slice.actions;

export const carsReducer = slice.reducer;
