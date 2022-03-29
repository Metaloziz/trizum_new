import classNames from 'classnames';
import { useState, FunctionComponent } from 'react';
import Account from '@components/account/Account';
import Logo from '@components/logo/Logo';
import styles from './Header.module.scss';

type Props = { className: string };

const Header: FunctionComponent<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <header className={classNames(styles.header, className, { [styles.open]: isOpen })}>
      <Logo />
      <Account />
    </header>
  );
};

export default Header;
