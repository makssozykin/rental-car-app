import { Button } from '../../components/Button/Button.jsx';
import { useEffect, useState } from 'react';
import { getCars, getCarsMore } from '../../redux/cars/operations.js';
import {
  selectCars,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selectors.js';
import { Filter } from '../../components/Filter/Filter.jsx';
import { CatalogList } from '../../components/CatalogList/CatalogList.jsx';
import css from './CarsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const CarsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const catalog = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const [query, setQuery] = useState({});
  const [isLoadMore, setIsLoadMore] = useState(false);
  const hasMoreCars = page < totalPages;
  console.log(catalog);
  useEffect(() => {
    dispatch(getCars(query));
  }, [dispatch, query]);

  const handleLoadMore = () => {
    if (isLoadMore) return;
    setIsLoadMore(true);
    dispatch(getCarsMore(query)).finally(() => {
      setIsLoadMore(false);
    });
  };

  const handleFilterSearch = params => {
    setQuery(params);
  };

  return (
    <main className={css.main}>
      <Filter onSearch={handleFilterSearch} />
      <CatalogList catalog={catalog} />
      {hasMoreCars && (
        <Button type="button" onClick={handleLoadMore} title="Load more">
          {t('catalogPage.button')}
        </Button>
      )}
    </main>
  );
};

export default CarsPage;
