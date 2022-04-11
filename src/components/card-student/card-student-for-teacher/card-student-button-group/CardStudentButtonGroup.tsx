import React from 'react';
import ButtonOpenClose from '@components/button-open-close/ButtonOpenClose';
import CustomButton from '@components/custom-button/CustomButton';
import styles from './CardStudentButtonGroup.module.scss';

const CardStudentButtonGroup = () => {
  return (
    <div className={styles.wrapper}>
      <CustomButton type={'parents'} size={'small'}>
        Родители
      </CustomButton>
      <ButtonOpenClose isOpen={false} />
    </div>
  );
};

export default CardStudentButtonGroup;
