import { NavLink } from 'react-router-dom';

import styles from './Logo.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import logoImage from 'assets/images/logo.png';
import Image from 'components/image/Image';

export const Logo = () => {
  const { Index } = AppRoutes;
  return (
    <NavLink to={Index}>
      <span className={styles.logo}>
        <Image src={logoImage} alt="Тризум" />
      </span>
    </NavLink>
  );
};

export default Logo;
