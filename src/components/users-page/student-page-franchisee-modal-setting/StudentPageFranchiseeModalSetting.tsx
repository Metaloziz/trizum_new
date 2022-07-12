import React from 'react';

import styles from './StudentPageFranchiseeModalSetting.module.scss';

import Button from 'components/button/Button';
import { Divider } from 'components/divider/Divider';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import StudentInformationForm from 'components/users-page/student-information-form/StudentInformationForm';

const StudentPageFranchiseeModalSetting = () => (
  <div className={styles.wrapper}>
    <h2>Добавление/изменение пользователя</h2>
    <StudentInformationForm />
    <Divider />
    {/* <div className={styles.divider} /> */}
    <h2 className={styles.title}>Родители ученика*</h2>
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
