import { useState, FC } from 'react';

import classNames from 'classnames';

import styles from './Header.module.scss';

import Account from 'components/account/Account';
import Burger from 'components/burger/Burger';
import DropDownMenu from 'components/drop-down-menu/DropDownMenu';
import Logo from 'components/logo/Logo';

type Props = { className: string };

const Header: FC<Props> = ({ className }) => {
  const [active, setActive] = useState<boolean>(false);
  const [isOpen] = useState(false);
  const handleClose = () => {
    setActive(false);
  };

  return (
    <header
      className={classNames(styles.header, className, {
        // @ts-ignore
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.accountBlock}>
        <div className={styles.burgerBlock} onClick={() => setActive(!active)}>
          <Burger />
        </div>
        <Logo />
      </div>
      <Account />
      <DropDownMenu active={active} onClose={handleClose} />
    </header>
  );
};

export default Header;
