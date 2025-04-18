import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Logo } from '../Logo/Logo.jsx';
import css from './Navigation.module.css';
import { Languages } from '../Languages/Languages.jsx';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const { t } = useTranslation();
  const classLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <NavLink to="/" className={css.logoLink}>
          <Logo />
        </NavLink>
        <div className={css.navLang}>
          <nav className={css.navigation}>
            <NavLink className={classLink} to="/">
              {t('navigation.home')}
            </NavLink>
            <NavLink className={classLink} to="/catalog">
              {t('navigation.catalog')}
            </NavLink>
          </nav>
          <div className={css.languagesCont}>
            <Languages />
          </div>
        </div>
      </div>
    </header>
  );
};
