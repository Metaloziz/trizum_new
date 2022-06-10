import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import StudentInformation from '@components/users-page/student-information/StudentInformation';
import StudentPageTitle from '@components/users-page/student-page-title/StudentPageTitle';
import styles from './StudentPageFranchiseeModalAddUser.module.scss';

const StudentPageFranchiseeModalAddUser = () => {
  return (
    <div className={styles.wrapper}>
      <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
      <StudentInformation />
      <div className={styles.button}>
        <CustomButton>Сохранить</CustomButton>
      </div>
    </div>
  );
};

export default StudentPageFranchiseeModalAddUser;
