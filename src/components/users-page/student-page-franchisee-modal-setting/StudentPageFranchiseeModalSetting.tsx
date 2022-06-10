import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import ButtonAddParent from '@components/users-page/button-add-parent/ButtonAddParent';
import StudentInformation from '@components/users-page/student-information/StudentInformation';
import StudentPageTitle from '@components/users-page/student-page-title/StudentPageTitle';
import StudentParents from '@components/users-page/student-parents/StudentParent';
import styles from './StudentPageFranchiseeModalSetting.module.scss';

const StudentPageFranchiseeModalSetting = () => {
  return (
    <div className={styles.wrapper}>
      <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
      <StudentInformation />
      <div className={styles.divider} />
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

export default StudentPageFranchiseeModalSetting;
