import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../Button/Button.jsx';
import { addFavoriteCar, removeFavoriteCar } from '../../redux/cars/slice.js';
import { selectFavoriteCars } from '../../redux/cars/selectors.js';
import sprite from '/icons/sprite1.svg';
import css from './CatalogItem.module.css';

export const CatalogItem = ({ car }) => {
  const {
    id,
    brand,
    model,
    year,
    img,
    mileage,
    rentalPrice,
    type,
    rentalCompany,
    address,
  } = car;
  const dispatch = useDispatch();
  const favoriteCars = useSelector(selectFavoriteCars);
  const isFavorite = favoriteCars.some(favoriteCar => favoriteCar.id === id);

  const handleFavouriteCarClick = () => {
    if (isFavorite) {
      dispatch(removeFavoriteCar(id));
    } else {
      dispatch(addFavoriteCar(car));
    }
  };

  const location = useLocation();
  const city = address.split(',')[1];
  const country = address.split(',')[2];
  const km = Math.round(Number(mileage) * 1.60934).toLocaleString();
  return (
    <>
      <div className={css.iconCont} onClick={handleFavouriteCarClick}>
        {isFavorite ? (
          <svg className={css.iconFavoriteActive}>
            <use href={sprite + '#icon-favoriteActive'} />
          </svg>
        ) : (
          <svg className={css.icon}>
            <use href={sprite + '#icon-favorite'} />
          </svg>
        )}
      </div>
      <img className={css.carImg} src={img} alt={`${brand} ${model}`} />

      <div className={css.carModel}>
        <p>
          {brand === 'Land Rover' ? 'Land' : brand} <span>{`${model}`}</span>
          {`, ${year}`}
        </p>
        <p>{`$${rentalPrice}`}</p>
      </div>
      <div className={css.location}>
        <p>{`${city} | ${country} | ${rentalCompany} |`}</p>
        <p>{`${type} | ${km} km`}</p>
      </div>

      <Link state={location} to={`/catalog/${id}`}>
        <Button title="Read more" type="button">
          Read more
        </Button>
      </Link>
    </>
  );
};
