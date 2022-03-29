import { FunctionComponent } from 'react';
import styles from './Hamburger.module.scss';

interface Props {
  isOpen?: boolean;
  onClick: () => void;
  className?: string;
}

const Hamburger: FunctionComponent<Props> = ({ isOpen, onClick, className }) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

  function addClassNames(): string {
    return `${className} ${styles.hamburger} ${isOpen ? styles.open : null}`;
  }
};

export default Hamburger;
