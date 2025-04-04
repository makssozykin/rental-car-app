import { useSelector } from 'react-redux';
import { CatalogItem } from '../CatalogItem/CatalogItem.jsx';
import css from './CatalogList.module.css';
import { Loader } from '../Loader/Loader.jsx';
import { selectLoading } from '../../redux/cars/selectors.js';

export const CatalogList = ({ catalog }) => {
  const isLoading = useSelector(selectLoading);

  return (
    <>
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
    </>
  );
};
