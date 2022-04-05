import React from 'react';
import Button from '@components/button/Button';
import styles from './CardStudentButtonGroup.module.scss';

const CardStudentButtonGroup = () => {
  return (
    <div className={styles.wrapper}>
      <Button>Ссылка на чаты</Button>
      <Button>Принять участие в олимпиаде</Button>
    </div>
  );
};

export default CardStudentButtonGroup;
