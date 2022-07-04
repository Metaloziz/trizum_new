import React from 'react';

import styles from './StudentPageFranchiseeModalParents.module.scss';

import Button from 'components/button/Button';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import StudentPageTitle from 'components/users-page/student-page-title/StudentPageTitle';
import StudentParents from 'components/users-page/student-parents/StudentParent';

const StudentPageFranchiseeModalParents = () => (
  <div className={styles.wrapper}>
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

export default StudentPageFranchiseeModalParents;
