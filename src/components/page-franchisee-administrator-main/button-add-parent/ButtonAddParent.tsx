import React from 'react';
import styles from './ButtonAddParent.module.scss';

const ButtonAddParent = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.button}>+</span>
    </div>
  );
};

export default ButtonAddParent;
