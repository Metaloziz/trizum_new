import React, { FC } from 'react';

import styles from './StudentPageFranchiseeModalParents.module.scss';

import Button from 'components/button/Button';
import { StudentParentsFormContainer } from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import { ResponseOneUser } from 'app/types/UserTypes';

type StudentPageFranchiseeModalParentsPropsT = { onCloseModal: () => void; user?: ResponseOneUser };

const StudentPageFranchiseeModalParents: FC<StudentPageFranchiseeModalParentsPropsT> = ({
  user,
  onCloseModal,
}) => (
  <div className={styles.wrapper}>
    <StudentParentsFormContainer
      franchiseId={user?.franchise?.id ? user.franchise.id : ''}
      studentId={user?.id ? user.id : ''}
      onCloseModal={onCloseModal}
      parents={user?.parents}
    />

    {/* <div className={styles.button}> */}
    {/*  <Button>Сохранить</Button> */}
    {/* </div> */}
  </div>
);

export default StudentPageFranchiseeModalParents;
