import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '/icons/sprite1.svg';
import { selectBrands } from '../../redux/cars/selectors.js';
import { getCars, getCarsBrand } from '../../redux/cars/operations.js';
import { Button } from '../Button/Button.jsx';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const [showChooseBrand, setShowChooseBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showChoosePrice, setShowChoosePrice] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
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
      brand: selectedBrand,
      rentalPrice: selectedPrice,
      minMileage:
        mileageFrom === ''
          ? ''
          : Math.round(Number(mileageFrom) / 1.60934).toString(),
      maxMileage:
        mileageTo === ''
          ? ''
          : Math.round(Number(mileageTo) / 1.60934).toString(),
    };
    console.log(formData);
    dispatch(getCars(formData));
    setSelectedBrand('');
    setSelectedPrice('');
    setMileageFrom('');
    setMileageTo('');
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
            value={selectedBrand}
            onClick={handleDropDownBrand}
            onChange={event => setSelectedBrand(event.target.value)}
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
            value={selectedPrice}
            onClick={handleDropDownPrice}
            onChange={event => setSelectedPrice(event.target.value)}
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
            value={mileageFrom}
            onChange={event => setMileageFrom(event.target.value)}
          />
          <input
            className={css.inputTo}
            type="text"
            name="inputTo"
            value={mileageTo}
            onChange={event => setMileageTo(event.target.value)}
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
