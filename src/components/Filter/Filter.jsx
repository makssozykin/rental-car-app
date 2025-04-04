import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrands } from '../../redux/cars/selectors.js';
import { getCarsBrand } from '../../redux/cars/operations.js';
import {
  setBrandFilter,
  setRentalPriceFilter,
  setMinMileageFilter,
  setMaxMileageFilter,
} from '../../redux/filters/slice.js';
import {
  selectedBrand,
  selectedRentalPrice,
  selectedMinMileage,
  selectedMaxMileage,
} from '../../redux/filters/selectors.js';
import { Button } from '../Button/Button.jsx';
import sprite from '/icons/sprite1.svg';
import css from './Filter.module.css';

export const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [showChooseBrand, setShowChooseBrand] = useState(false);
  const brandCar = useSelector(selectedBrand);
  const [showChoosePrice, setShowChoosePrice] = useState(false);
  const priceCar = useSelector(selectedRentalPrice);
  const mileageCarFrom = useSelector(selectedMinMileage);
  const mileageCarTo = useSelector(selectedMaxMileage);
  const brands = useSelector(selectBrands);
  const prices = [];
  for (let i = 30; i <= 200; i += 10) {
    prices.push(i);
  }
  useEffect(() => {
    dispatch(getCarsBrand());
  }, [dispatch]);

  const handleDropDownBrand = () => {
    setShowChooseBrand(!showChooseBrand);
  };
  const handleDropDownPrice = () => {
    setShowChoosePrice(!showChoosePrice);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();
    const formData = {
      brand: brandCar,
      rentalPrice: priceCar,
      minMileage:
        mileageCarFrom === ''
          ? ''
          : Math.round(Number(mileageCarFrom) / 1.60934).toString(),
      maxMileage:
        mileageCarTo === ''
          ? ''
          : Math.round(Number(mileageCarTo) / 1.60934).toString(),
    };
    onSearch(formData);
    dispatch(setBrandFilter(''));
    dispatch(setRentalPriceFilter(''));
    dispatch(setMinMileageFilter(''));
    dispatch(setMaxMileageFilter(''));
  };

  return (
    <form className={css.searchForm} onSubmit={handleSearchSubmit}>
      <div className={css.brandContainer}>
        <label htmlFor="brandSelect">Car brand</label>
        <div className={css.selectContainer}>
          <select
            id="brandSelect"
            className={css.select}
            name="brandSelect"
            value={brandCar}
            onClick={handleDropDownBrand}
            onChange={event => dispatch(setBrandFilter(event.target.value))}
          >
            <option id="chooseBrandOption" value="">
              Choose a brand
            </option>
            {brands.map((brand, index) => (
              <option key={index} value={brand} label={brand}>
                {brand}
              </option>
            ))}
          </select>
          <svg className={css.chevronIcon}>
            <use
              href={
                showChooseBrand
                  ? sprite + '#icon-chevron-up'
                  : sprite + '#icon-chevron-down'
              }
            />
          </svg>
        </div>
      </div>
      <div className={css.brandContainer}>
        <label htmlFor="priceSelect">Price/ 1 hour</label>
        <div className={css.selectContainer}>
          <select
            id="priceSelect"
            className={css.select}
            name="priceSelect"
            value={priceCar}
            onClick={handleDropDownPrice}
            onChange={event =>
              dispatch(setRentalPriceFilter(event.target.value))
            }
          >
            <option id="chooseBrandOption" value="">
              Choose a price
            </option>
            {prices.map((price, index) => (
              <option key={index} value={price} label={price}>
                {price}
              </option>
            ))}
          </select>
          <svg className={css.chevronIcon}>
            <use
              href={
                showChoosePrice
                  ? sprite + '#icon-chevron-up'
                  : sprite + '#icon-chevron-down'
              }
            />
          </svg>
        </div>
      </div>
      <div className={`${css.brandContainer} ${css.inputs}`}>
        <label>Сar mileage / km</label>
        <div>
          <input
            className={css.inputFrom}
            type="text"
            name="inputFrom"
            value={mileageCarFrom}
            onChange={event =>
              dispatch(setMinMileageFilter(event.target.value))
            }
          />
          <input
            className={css.inputTo}
            type="text"
            name="inputTo"
            value={mileageCarTo}
            onChange={event =>
              dispatch(setMaxMileageFilter(event.target.value))
            }
          />
          <p className={css.textForm}>From</p>
          <p className={css.textTo}>To</p>
        </div>
      </div>
      <Button title="Search" type="submit">
        Search
      </Button>
    </form>
  );
};
