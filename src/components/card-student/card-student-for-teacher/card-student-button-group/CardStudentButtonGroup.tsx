import React from 'react';

import modals from '../../../../app/stores/CardStudentExtended';

import styles from './CardStudentButtonGroup.module.scss';

import ButtonOpenClose from 'components/button-open-close/ButtonOpenClose';
import Button from 'components/button/Button';

const CardStudentButtonGroup = () => (
  <div className={styles.wrapper}>
    <Button type="parents" size="small" onClick={() => modals.changeParents()}>
      Родители
    </Button>
    <ButtonOpenClose isOpen={false} />
  </div>
);

export default CardStudentButtonGroup;
