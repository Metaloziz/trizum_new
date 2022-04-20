import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import ButtonAddParent from '@components/page-franchisee-administrator-main/button-add-parent/ButtonAddParent';
import StudentInformation from '@components/page-franchisee-administrator-main/student-information/StudentInformation';
import StudentPageTitle from '@components/page-franchisee-administrator-main/student-page-title/StudentPageTitle';
import StudentParents from '@components/page-franchisee-administrator-main/student-parents/StudentParent';
import styles from './StudentPageFranchiseeModalParents.module.scss';

const StudentPageFranchiseeModalParents = () => {
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

export default StudentPageFranchiseeModalParents;
