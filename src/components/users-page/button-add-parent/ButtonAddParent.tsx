import React, { FC } from 'react';

import styles from './ButtonAddParent.module.scss';

import { DefaultButtonProps } from 'app/types/DefaultButtonProps';

const ButtonAddParent: FC<DefaultButtonProps> = props => (
  <div className={styles.wrapper}>
    <button {...props} type="button" className={styles.button}>
      +
    </button>
  </div>
);

export default ButtonAddParent;
