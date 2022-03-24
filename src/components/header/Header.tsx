import classNames from 'classnames';
import { useState, FunctionComponent } from 'react';
import Hamburger from '@components/navigation/Hamburger';
import Navigation from '@components/navigation/Navigation';
import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <header className={classNames(styles.header, { [styles.open]: isOpen })}>
      <nav>
        <Navigation
          activeClassName={styles.active}
          links={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/not-exist', label: 'Not-exist' },
          ]}
          onClick={close}
        />
      </nav>

      <Hamburger isOpen={isOpen} onClick={toggle} className={styles.hamburger} />
    </header>
  );
};

export default Header;
