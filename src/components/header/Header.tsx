import { useState, FC, useEffect, useRef } from 'react';

import classNames from 'classnames';

import styles from './Header.module.scss';

import Account from 'components/account/Account';
import Burger from 'components/burger/Burger';
import DropDownMenu from 'components/drop-down-menu/DropDownMenu';
import Logo from 'components/logo/Logo';
import ClickAwayListener from '@mui/material/ClickAwayListener';

type Props = { className: string };

const Header: FC<Props> = ({ className }) => {
  const [isOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <header
      className={classNames(styles.header, className, {
        // @ts-ignore
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.accountBlock}>
        <div className={styles.burgerBlock} onClick={handleClick}>
          <Burger />
        </div>
        <Logo />
      </div>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <div>
          <DropDownMenu active={open} onClose={handleClick} />
        </div>

        {/* 
        не будет срабатывать анимация
        но будет закрываться без каких либо проблем 

        <div>
          {open ? (
            <>
              <DropDownMenu active={open} onClose={handleClickAway} />
            </>
          ) : null}
        </div> */}
      </ClickAwayListener>
      <Account />
    </header>
  );
};

export default Header;
