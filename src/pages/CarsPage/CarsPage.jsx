import { Filter } from '../../components/Filter/Filter.jsx';
import { CatalogList } from '../../components/CatalogList/CatalogList.jsx';
import css from './CarsPage.module.css';
const CarsPage = () => {
  return (
    <main className={css.main}>
      <Filter />
      <CatalogList />
    </main>
  );
};

export default CarsPage;
