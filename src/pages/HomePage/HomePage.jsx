import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1>Find your perfect rental car</h1>
        <h2>Reliable and budget-friendly rentals for any journey</h2>
        <Link to="/catalog">
          <Button title="View Catalog" type="button">
            View Catalog
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
