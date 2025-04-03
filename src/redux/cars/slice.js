import { createSlice } from '@reduxjs/toolkit';
import { getCarById, getCars, getCarsBrand } from './operations.js';

const initialState = {
  catalog: [],
  brands: [],
  car: {
    accessories: [],
    address: null,
    brand: null,
    description: null,
    engineSize: null,
    fuelConsumption: null,
    functionalities: [],
    id: null,
    img: null,
    mileage: null,
    model: null,
    rentalCompany: null,
    rentalConditions: [],
    rentalPrice: null,
    type: null,
    year: null,
  },
  page: 1,
  totalCars: null,
  totalPages: null,
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
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.catalog = action.payload.cars;
        state.page = 1;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
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
      })
      .addCase(getCarById.pending, handlePending)
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.errors = action.error.message;
        state.loading = false;
      });
  },
});

export const carsReducer = slice.reducer;
