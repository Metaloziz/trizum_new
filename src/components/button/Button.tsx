import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './Button.module.scss';

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FunctionComponent<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.customButton} onClick={onClick}>
      <span className={styles.arrowBtn}>
        <Image src="/img/arrow-btn.svg" alt="arrow" width={26} height={13} />
      </span>
      {children}
    </button>
  );
};

export default Button;
