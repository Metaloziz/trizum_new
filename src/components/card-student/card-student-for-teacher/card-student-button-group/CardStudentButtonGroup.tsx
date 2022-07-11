import React from 'react';

import modals from '../../../../app/stores/CardStudentExtended';

import styles from './CardStudentButtonGroup.module.scss';

import SetStatusButton from 'components/button-open-close/SetStatusButton';
import Button from 'components/button/Button';

const CardStudentButtonGroup = () => (
  <div className={styles.wrapper}>
    <Button variant="parents" size="small" onClick={() => modals.changeParents()}>
      Родители
    </Button>
    {/* <SetStatusButton isOpen={false} /> */}
  </div>
);

export default CardStudentButtonGroup;
