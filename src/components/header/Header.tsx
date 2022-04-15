import classNames from 'classnames';
import { useState, FC } from 'react';
import Account from '@components/account/Account';
import Logo from '@components/logo/Logo';
import styles from './Header.module.scss';

type Props = { className: string };

const Header: FC<Props> = ({ className }) => {
  const [isOpen] = useState(false);
  return (
    <header
      className={classNames(styles.header, className, {
        [styles.open]: isOpen,
      })}
    >
      <Logo />
      <Account />
    </header>
  );
};

export default Header;
