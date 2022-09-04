import { useState, FC, useEffect, useRef } from 'react';

import classNames from 'classnames';

import styles from './Header.module.scss';

import Account from 'components/account/Account';
import BurgerButton from 'components/burger/Burger';
import DropDownMenu from 'components/drop-down-menu/DropDownMenu';
import Logo from 'components/logo/Logo';
import ClickAwayListener from '@mui/material/ClickAwayListener';

type Props = { className: string };

const Header: FC<Props> = ({ className }) => {
  const [isOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (window.innerWidth <= 1280) {
      setOpen(prev => !prev);
    }
  };

  const handleClickAway = () => {
    if (window.innerWidth <= 1280) {
      setOpen(false);
    }
  };
  return (
    <header
      className={classNames(styles.header, className, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.accountBlock}>
        <ClickAwayListener
          onClickAway={handleClickAway}
        >
          <div className={styles.burgerBlock} >
            <BurgerButton onClick={handleClick} />
            <DropDownMenu active={open}
              onClose={handleClick}
            />
          </div>
        </ClickAwayListener>
        <Logo />
      </div>
      <Account />
    </header>
  );
};

export default Header;
