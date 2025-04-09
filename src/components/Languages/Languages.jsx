import { useTranslation } from 'react-i18next';
import sprite from '/icons/sprite1.svg';
import css from './Languages.module.css';

export const Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <div className={css.languages}>
        <button
          className={css.languageBtn}
          onClick={() => changeLanguage('en')}
        >
          <svg
            width="18"
            height="18"
            aria-label="Flag en"
            className={css.iconFlag}
          >
            <use xlinkHref={`${sprite}#en-flag`}></use>
          </svg>
        </button>
        <span className={css.line}>|</span>
        <button
          className={css.languageBtn}
          onClick={() => changeLanguage('uk')}
        >
          <svg
            width="18"
            height="18"
            aria-label="Flag ua"
            className={css.iconFlag}
          >
            <use xlinkHref={`${sprite}#ua-flag`}></use>
          </svg>
        </button>
      </div>
    </>
  );
};
