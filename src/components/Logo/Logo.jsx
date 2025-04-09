import css from './Logo.module.css';
export const Logo = () => {
  return (
    <div className={css.logo}>
      <img src="/images/Logo.png" alt="RentalCar" />
    </div>
  );
};
