import React from 'react';

import styles from './StudentPageSlider.module.scss';

import Step from 'components/step/Step';

const StudentPageSlider = () => (
  <div className={styles.wrapper}>
    <span>Номер урока</span>
    <div className={styles.stepWrapper}>
      <Step countStep={5} />
    </div>
  </div>
);

export default StudentPageSlider;
