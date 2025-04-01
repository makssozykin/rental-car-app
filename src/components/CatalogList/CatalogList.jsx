import { useSelector, useDispatch } from 'react-redux';

import { selectCars } from '../../redux/cars/selectors.js';
import { useEffect } from 'react';
import { getCars } from '../../redux/cars/operations.js';
import { CatalogItem } from '../CatalogItem/CatalogItem.jsx';
import css from './CatalogList.module.css';

export const CatalogList = () => {
  const catalog = useSelector(selectCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);
  return (
    <div>
      <ul className={css.carList}>
        {catalog.map(car => (
          <li className={css.carItem} key={car.id}>
            <CatalogItem car={car} />
          </li>
        ))}
      </ul>
    </div>
  );
};
