import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBrandFilter: (state, action) => {
      state.brand = action.payload;
    },
    setRentalPriceFilter: (state, action) => {
      state.rentalPrice = action.payload;
    },
    setMinMileageFilter: (state, action) => {
      state.minMileage = action.payload;
    },
    setMaxMileageFilter: (state, action) => {
      state.maxMileage = action.payload;
    },
  },
});

export const {
  setBrandFilter,
  setRentalPriceFilter,
  setMinMileageFilter,
  setMaxMileageFilter,
} = slice.actions;

export const filterReducer = slice.reducer;
