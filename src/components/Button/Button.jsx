import clsx from 'clsx';
import css from './Button.module.css';

export const Button = ({ title, type, children }) => {
  const classes = mainClass => {
    return clsx(mainClass, {
      [css.btnHomePage]: title === 'View Catalog',
      [css.btnListItem]: title === 'Read more',
      [css.btnSearch]: title === 'Search',
      [css.btnSend]: title === 'Send',
      [css.btnLoadMore]: title === 'Load More',
    });
  };

  return (
    <button type={type} className={classes(css.btn)}>
      {children}
    </button>
  );
};
