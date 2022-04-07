import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import styles from './CardStudentButtonGroup.module.scss';

const CardStudentButtonGroup = () => {
  return (
    <div className={styles.wrapper}>
      <CustomButton>Ссылка на чаты</CustomButton>
      <CustomButton>Принять участие в олимпиаде</CustomButton>
    </div>
  );
};

export default CardStudentButtonGroup;
