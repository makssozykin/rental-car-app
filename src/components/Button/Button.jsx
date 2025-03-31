import clsx from 'clsx';
import css from './Button.module.css';

export const Button = ({ title, children }) => {
  const classes = mainClass => {
    return clsx(mainClass, {
      [css.btnHomePage]: title === 'View Catalog',
      [css.btnListItem]: title === 'Read more',
      [css.btnLoadMore]: title === 'Load More',
    });
  };

  return <button className={classes(css.btn)}>{children}</button>;
};
