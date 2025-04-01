import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '/icons/sprite1.svg';
import { selectBrands } from '../../redux/cars/selectors.js';
import { getCarsBrand } from '../../redux/cars/operations.js';
import { Button } from '../Button/Button.jsx';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const [showChooseBrand, setShowChooseBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showChoosePrice, setShowChoosePrice] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const brands = useSelector(selectBrands);
  const prices = [];
  for (let i = 30; i <= 200; i += 10) {
    prices.push(i);
  }
  useEffect(() => {
    dispatch(getCarsBrand());
  }, [dispatch]);
  console.log(brands);

  const handleDropDownBrand = () => {
    setShowChooseBrand(!showChooseBrand);
  };
  const handleDropDownPrice = () => {
    setShowChoosePrice(!showChoosePrice);
  };

  return (
    <form className={css.searchForm}>
      <div className={css.brandContainer}>
        <label htmlFor="brandSelect">Car brand</label>
        <div className={css.selectContainer}>
          <select
            id="brandSelect"
            className={css.select}
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
                  ? sprite + '#icon-chevron-down'
                  : sprite + '#icon-chevron-up'
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
                  ? sprite + '#icon-chevron-down'
                  : sprite + '#icon-chevron-up'
              }
            />
          </svg>
        </div>
      </div>
      <Button title="Search" type="submit">
        Search
      </Button>
    </form>
  );
};
