import { createSlice } from '@reduxjs/toolkit';
import { getCars, getCarsBrand, getCarsMore } from './operations.js';

const initialState = {
  catalog: [],
  brands: [],
  favoriteCars: [],
  page: 1,
  limit: 12,
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
  reducers: {
    addFavoriteCar: (state, action) => {
      const carFind = state.catalog.find(car => car.id === action.payload.id);
      if (carFind) state.favoriteCars.push(action.payload);
    },
    removeFavoriteCar: (state, action) => {
      state.favoriteCars = state.favoriteCars.filter(
        car => car.id !== action.payload
      );
    },
  },
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
      .addCase(getCarsMore.pending, handlePending)
      .addCase(getCarsMore.fulfilled, (state, action) => {
        state.loading = false;
        state.catalog = [...state.catalog, ...action.payload.cars];
        state.page += 1;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getCarsMore.rejected, (state, action) => {
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

export const { addFavoriteCar, removeFavoriteCar } = slice.actions;

export const carsReducer = slice.reducer;
