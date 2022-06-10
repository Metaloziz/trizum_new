import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import ButtonAddParent from '@components/users-page/button-add-parent/ButtonAddParent';
import StudentPageTitle from '@components/users-page/student-page-title/StudentPageTitle';
import StudentParents from '@components/users-page/student-parents/StudentParent';
import styles from './StudentPageFranchiseeModalParents.module.scss';

const StudentPageFranchiseeModalParents = () => {
  return (
    <div className={styles.wrapper}>
      <StudentPageTitle>Родители ученика*</StudentPageTitle>
      <StudentParents />
      <div className={styles.buttonAddParent}>
        <ButtonAddParent />
      </div>
      <div className={styles.button}>
        <CustomButton>Сохранить</CustomButton>
      </div>
    </div>
  );
};

export default StudentPageFranchiseeModalParents;
