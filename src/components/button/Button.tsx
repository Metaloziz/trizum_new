import Image from 'next/image';
import { FC } from 'react';
import buttonImage from '@svgs/arrow-btn.svg';
import styles from './Button.module.scss';

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.customButton} onClick={onClick}>
      <span className={styles.arrowBtn}>
        <Image src={buttonImage} alt='arrow' width={26} height={13} />
      </span>
      {children}
    </button>
  );
};

export default Button;
