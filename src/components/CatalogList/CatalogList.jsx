import { useSelector, useDispatch } from 'react-redux';

import { selectCars } from '../../redux/cars/selectors.js';
import { useEffect, useState } from 'react';
import { getCars } from '../../redux/cars/operations.js';
import { CatalogItem } from '../CatalogItem/CatalogItem.jsx';
import css from './CatalogList.module.css';
import { Loader } from '../Loader/Loader.jsx';

export const CatalogList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const catalog = useSelector(selectCars);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCars());
    setIsLoading(false);
  }, [dispatch]);
  return (
    <div>
      {isLoading && <Loader />}
      <ul className={css.carList}>
        {catalog.length === 0 ? (
          <li className={css.noCars}>
            <p>Unfortunately, no cars matching your selection were found.</p>
            <p>Please choose other search parameters.</p>
          </li>
        ) : (
          catalog.map(car => (
            <li className={css.carItem} key={car.id}>
              <CatalogItem car={car} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
