import { FC } from 'react';
import styles from './Hamburger.module.scss';

interface Props {
  isOpen?: boolean;
  onClick: () => void;
  className?: string;
}

const Hamburger: FC<Props> = ({ isOpen, onClick, className }) => {
  function addClassNames(): string {
    return `${className} ${styles.hamburger} ${isOpen ? styles.open : null}`;
  }
  const classNames = addClassNames();

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={onClick} className={classNames}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </a>
  );
};

export default Hamburger;
