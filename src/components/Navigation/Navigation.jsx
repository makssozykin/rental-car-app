import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Logo } from '../Logo/Logo.jsx';
import css from './Navigation.module.css';

export const Navigation = () => {
  const classLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <nav className={css.navigation}>
          <NavLink className={classLink} to="/">
            Home
          </NavLink>
          <NavLink className={classLink} to="/catalog">
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
