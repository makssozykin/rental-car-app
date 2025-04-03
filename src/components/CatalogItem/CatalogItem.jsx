import { useLocation, Link } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
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
  const location = useLocation();
  const city = address.split(',')[1];
  const country = address.split(',')[2];
  const km = Math.round(Number(mileage) * 1.60934).toLocaleString();
  return (
    <>
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
