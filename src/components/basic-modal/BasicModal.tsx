import Image from 'next/image';
import React, { FC, useState } from 'react';
import buttonClose from '@svgs/button.svg';
import styles from './BasicModal.module.scss';

interface Props {
  children?: React.ReactNode;
  visibility: boolean;
  changeVisibility: (value: boolean) => void;
}

const BasicModal: FC<Props> = ({ children, visibility, changeVisibility }) => {
  if (!visibility) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={() => changeVisibility(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close} onClick={() => changeVisibility(false)}>
          <Image src={buttonClose} width={14} height={14} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default BasicModal;
