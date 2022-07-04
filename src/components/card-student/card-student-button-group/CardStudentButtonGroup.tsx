import React from 'react';

import styles from './CardStudentButtonGroup.module.scss';

import Button from 'components/button/Button';

const CardStudentButtonGroup = () => (
  <div className={styles.wrapper}>
    <Button>Ссылка на чаты</Button>
    <Button>Принять участие в олимпиаде</Button>
  </div>
);

export default CardStudentButtonGroup;
