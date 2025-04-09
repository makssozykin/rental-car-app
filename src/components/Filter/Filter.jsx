import { useEffect } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        <label htmlFor="brandSelect">
          {t('catalogPage.filters.brandLabel')}
        </label>
        <Select
          id="brandSelect"
          classNamePrefix="select"
          placeholder={t('catalogPage.filters.placeholderBrand')}
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
        <label htmlFor="priceSelect">
          {t('catalogPage.filters.priceLabel')}
        </label>
        <Select
          id="priceSelect"
          classNamePrefix="select"
          placeholder={t('catalogPage.filters.placeholderPrice')}
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
        <label>{t('catalogPage.filters.mileageLabel')}</label>
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
          <p className={css.textForm}>{t('catalogPage.filters.from')}</p>
          <p className={css.textTo}>{t('catalogPage.filters.to')}</p>
        </div>
      </div>
      <Button title="Search" type="submit">
        {t('catalogPage.filters.button')}
      </Button>
    </form>
  );
};
