import { useState, useEffect } from 'react';
import Select from 'react-select';
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
    prices.push({ value: i, label: `${i}` });
  }

  const brandsOptions = brands.map(brand => ({ value: brand, label: brand }));

  useEffect(() => {
    dispatch(getCarsBrand());
  }, [dispatch]);

  const handleDropDownBrand = () => {
    setShowChooseBrand(!showChooseBrand);
    console.log(showChooseBrand);
  };
  const handleDropDownPrice = () => {
    setShowChoosePrice(!showChoosePrice);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();
    const formData = {
      brand: brandCar.value,
      rentalPrice: priceCar.value,
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
        <div className={css.selectContainer} onClick={handleDropDownBrand}>
          <Select
            id="brandSelect"
            placeholder="Choose a brand"
            value={brandCar}
            isClearable={true}
            onChange={selectedOption =>
              dispatch(setBrandFilter(selectedOption))
            }
            options={brandsOptions}
            styles={{
              control: () => ({
                width: '100%',
                height: '44px',
                borderColor: 'rgba(18, 20, 23, 0.2)',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: 'var(--input-background)',
                padding: '12px 16px',
                fontSize: '16px',
                fontFamily: 'Manrope',
                fontWeight: '500',
                lineHeight: '1.25',
                appearance: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }),
              option: (styles, { isFocused }) => {
                return {
                  ...styles,
                  padding: '12px 16px',
                  color: isFocused
                    ? 'var(--main-text-color)'
                    : 'var(--second-text-color)',
                  backgroundColor: 'transparent',
                  fontFamily: 'Manrope',
                  lineHeight: '1.25',
                  display: 'flex',
                  alignItems: 'center',
                };
              },

              placeholder: styles => ({
                ...styles,
                color: 'rgba(18, 20, 23, 1)',
              }),
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
              ClearIndicator: () => null,
            }}
            menuIsOpen={showChooseBrand}
          />
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
        <div className={css.selectContainer} onClick={handleDropDownPrice}>
          <Select
            id="priceSelect"
            placeholder="Choose a price"
            value={priceCar}
            isClearable={true}
            onChange={selectedOption =>
              dispatch(setRentalPriceFilter(selectedOption))
            }
            options={prices}
            styles={{
              control: () => ({
                width: '100%',
                height: '44px',
                borderColor: 'rgba(18, 20, 23, 0.2)',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: 'var(--input-background)',
                padding: '12px 16px',
                fontSize: '16px',
                fontFamily: 'Manrope',
                fontWeight: '500',
                lineHeight: '1.25',
                appearance: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '8px',
              }),
              MenuList: () => {
                return {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '196px',
                  height: '188px',
                };
              },
              option: (styles, { isFocused }) => {
                return {
                  ...styles,
                  padding: '12px 16px',
                  color: isFocused
                    ? 'var(--main-text-color)'
                    : 'var(--second-text-color)',
                  backgroundColor: 'transparent',
                  fontFamily: 'Manrope',
                  lineHeight: '1.25',
                };
              },

              placeholder: styles => ({
                ...styles,
                color: 'rgba(18, 20, 23, 1)',
              }),
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
              ClearIndicator: () => null,
            }}
            menuIsOpen={showChoosePrice}
          />
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
