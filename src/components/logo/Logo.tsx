import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@constants/Routes';
import logoImage from '@images/logo.png';
import styles from './Logo.module.scss';

export const Logo = () => {
  const { Index } = Routes;
  return (
    <Link href={Index} passHref>
      <a className={styles.logo}>
        <Image src={logoImage} alt={'Тризум'} />
      </a>
    </Link>
  );
};

export default Logo;
