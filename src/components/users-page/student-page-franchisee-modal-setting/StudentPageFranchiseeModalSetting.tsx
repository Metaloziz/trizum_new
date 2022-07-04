import React from 'react';

import styles from './StudentPageFranchiseeModalSetting.module.scss';

import Button from 'components/button/Button';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import StudentInformation from 'components/users-page/student-information/StudentInformation';
import StudentPageTitle from 'components/users-page/student-page-title/StudentPageTitle';
import StudentParents from 'components/users-page/student-parents/StudentParent';

const StudentPageFranchiseeModalSetting = () => (
  <div className={styles.wrapper}>
    <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
    <StudentInformation />
    <div className={styles.divider} />
    <StudentPageTitle>Родители ученика*</StudentPageTitle>
    {/* <StudentParents /> */}
    <div className={styles.buttonAddParent}>
      <ButtonAddParent />
    </div>
    <div className={styles.button}>
      <Button>Сохранить</Button>
    </div>
  </div>
);

export default StudentPageFranchiseeModalSetting;
