import React from 'react';
import styles from './ButtonAddParent.module.scss';

const ButtonAddParent = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => console.log('add')}>
        +
      </button>
    </div>
  );
};

export default ButtonAddParent;
