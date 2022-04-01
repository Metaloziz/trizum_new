import React from 'react';
import Step from '@components/step/Step';
import styles from './StudentPageSlider.module.scss';

const StudentPageSlider = () => {
  return (
    <div className={styles.wrapper}>
      <span>Номер урока</span>
      <Step pageCount={5} initialPage={1} />
    </div>
  );
};

export default StudentPageSlider;
