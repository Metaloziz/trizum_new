import React from 'react';

import styles from './ButtonAddParent.module.scss';

const ButtonAddParent = () => {
  const onClick = () => {};
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClick}>
        +
      </button>
    </div>
  );
};

export default ButtonAddParent;
