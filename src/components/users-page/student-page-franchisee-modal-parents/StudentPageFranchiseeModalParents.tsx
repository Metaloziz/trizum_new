import React from 'react';

import styles from './StudentPageFranchiseeModalParents.module.scss';

import Button from 'components/button/Button';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';

const StudentPageFranchiseeModalParents = () => (
  <div className={styles.wrapper}>
    <h2>Родители ученика*</h2>
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
