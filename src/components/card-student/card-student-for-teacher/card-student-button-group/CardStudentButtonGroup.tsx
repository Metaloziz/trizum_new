import React from 'react';
import ButtonOpenClose from '@components/button-open-close/ButtonOpenClose';
import CustomButton from '@components/custom-button/CustomButton';
import styles from './CardStudentButtonGroup.module.scss';
import modals from '../../../../app/stores/CardStudentExtended';

const CardStudentButtonGroup = () => {
  return (
    <div className={styles.wrapper}>
      <CustomButton
        type={'parents'}
        size={'small'}
        onClick={() => modals.changeParents()}
      >
        Родители
      </CustomButton>
      <ButtonOpenClose isOpen={false} />
    </div>
  );
};

export default CardStudentButtonGroup;
