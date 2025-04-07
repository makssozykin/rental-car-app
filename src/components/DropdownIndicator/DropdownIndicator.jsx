import { components } from 'react-select';
import sprite from '/icons/sprite1.svg';
import css from './DropdownIndicator.module.css';

const DropdownIndicator = props => {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      {selectProps.menuIsOpen ? (
        <svg className={css.chevron}>
          <use href={sprite + '#icon-chevron-up'} />
        </svg>
      ) : (
        <svg className={css.chevron}>
          <use href={sprite + '#icon-chevron-down'} />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
