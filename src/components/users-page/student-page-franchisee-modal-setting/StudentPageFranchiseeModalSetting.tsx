import React from 'react';

import styles from './StudentPageFranchiseeModalSetting.module.scss';

import Button from 'components/button/Button';
import { Divider } from 'components/divider/Divider';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import StudentInformationForm from 'components/users-page/student-information-form/StudentInformationForm';
import StudentPageTitle from 'components/users-page/student-page-title/StudentPageTitle';
import StudentParentsForm from 'components/users-page/student-parents-form/StudentParentsForm';

const StudentPageFranchiseeModalSetting = () => (
  <div className={styles.wrapper}>
    <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
    <StudentInformationForm />
    <Divider />
    {/* <div className={styles.divider} /> */}
    <StudentPageTitle>Родители ученика*</StudentPageTitle>
    {/* <StudentParents  /> */}
    <div className={styles.buttonAddParent}>
      <ButtonAddParent />
    </div>
    <div className={styles.button}>
      <Button>Сохранить</Button>
    </div>
  </div>
);

export default StudentPageFranchiseeModalSetting;
