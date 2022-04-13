import classNames from 'classnames';
import { FC } from 'react';
import styles from './ButtonPlay.module.scss';

type Props = {
  className?: string;
  size?: 'small' | 'normal';
};

const ButtonPlay: FC<Props> = ({ size = 'normal', className = '' }) => {
  return (
    <button
      className={classNames(styles.container, className, {
        [styles.containerSmalled]: size === 'small',
      })}
    >
      <div className={styles.img}></div>
      <p className={styles.text}>Играть</p>
    </button>
  );
};

export default ButtonPlay;
