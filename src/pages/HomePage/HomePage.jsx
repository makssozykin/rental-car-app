import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.jsx';
import { useTranslation } from 'react-i18next';
import css from './HomePage.module.css';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1>{t('homepage.title')}</h1>
        <h2>{t('homepage.text')}</h2>
        <Link to="/catalog">
          <Button title="View Catalog" type="button">
            {t('homepage.button')}
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
