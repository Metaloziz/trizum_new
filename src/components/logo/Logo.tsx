import Image from 'next/image';
import logoImage from '@images/logo.png';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src={logoImage} alt={'Тризум'} />
    </div>
  );
};

export default Logo;
