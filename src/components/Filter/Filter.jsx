import { useEffect } from 'react';
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
import DropdownIndicator from '../DropdownIndicator/DropdownIndicator.jsx';
import css from './Filter.module.css';
import toast from 'react-hot-toast';

export const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brandCar = useSelector(selectedBrand);
  const priceCar = useSelector(selectedRentalPrice);
  const mileageCarFrom = useSelector(selectedMinMileage);
  const mileageCarTo = useSelector(selectedMaxMileage);
  const brands = useSelector(selectBrands);
  const prices = [];
  for (let i = 30; i <= 200; i += 10) {
    prices.push({ value: i, label: `${i}` });
  }

  const brandsOptions = brands.map(brand => ({ value: brand, label: brand }));

  const formatNumber = number => {
    const value = number.toString().replace(/,/g, '');
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue;
  };

  const handleMinMileageChange = event => {
    const rawValue = event.target.value.replace(/,/g, '');
    const parsedValue = rawValue === '' ? '' : parseInt(rawValue, 10);
    dispatch(setMinMileageFilter(parsedValue));

    if (isNaN(parsedValue) && rawValue !== '') {
      toast.error('Please enter a valid number Mileage From.');
      dispatch(setMinMileageFilter(''));
      event.target.value = '';
    }
  };

  const handleMaxMileageChange = event => {
    const rawValue = event.target.value.replace(/,/g, '');
    const parsedValue = rawValue === '' ? '' : parseInt(rawValue, 10);
    dispatch(setMaxMileageFilter(parsedValue));

    if (isNaN(parsedValue) && rawValue !== '') {
      toast.error('Please enter a valid number Mileage To.');
      dispatch(setMaxMileageFilter(''));
      event.target.value = '';
    }
  };

  useEffect(() => {
    dispatch(getCarsBrand());
  }, [dispatch]);

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
        <Select
          id="brandSelect"
          classNamePrefix="select"
          placeholder="Choose a brand"
          value={brandCar}
          isClearable={true}
          onChange={selectedOption => dispatch(setBrandFilter(selectedOption))}
          options={brandsOptions}
          components={{
            DropdownIndicator,
          }}
          styles={{
            indicatorSeparator: () => ({ display: 'none' }),
            ClearIndicator: () => ({ display: 'none' }),
          }}
          isSearchable={false}
        />
      </div>
      <div className={css.brandContainer}>
        <label htmlFor="priceSelect">Price/ 1 hour</label>
        <Select
          id="priceSelect"
          classNamePrefix="select"
          placeholder="Choose a price"
          value={priceCar}
          isClearable={true}
          onChange={selectedOption =>
            dispatch(setRentalPriceFilter(selectedOption))
          }
          options={prices}
          components={{
            DropdownIndicator,
          }}
          styles={{
            indicatorSeparator: () => ({ display: 'none' }),
            ClearIndicator: () => ({ display: 'none' }),
          }}
          isSearchable={false}
        />
      </div>
      <div className={`${css.brandContainer} ${css.inputs}`}>
        <label>Сar mileage / km</label>
        <div>
          <input
            className={css.inputFrom}
            type="text"
            name="inputFrom"
            value={formatNumber(mileageCarFrom)}
            onChange={handleMinMileageChange}
          />
          <input
            className={css.inputTo}
            type="text"
            name="inputTo"
            value={formatNumber(mileageCarTo)}
            onChange={handleMaxMileageChange}
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
