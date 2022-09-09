import React, { ChangeEvent, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { observer } from 'mobx-react-lite';

import modals from '../../app/stores/CardStudentExtended';

import styles from './UsersPage.module.scss';
import franchiseeStore from 'app/stores/franchiseeStore';
import groupStore from 'app/stores/groupStore';
import tariffsStore from 'app/stores/tariffsStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import BasicModal from 'components/basic-modal/BasicModal';
import CardStudentExtended from 'components/card-student/card-student-extended/CardStudentExtended';
import StudentPageFranchiseeModalAddUser from 'components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser';
import StudentPageFranchiseeModalParents from 'components/users-page/student-page-franchisee-modal-parents/StudentPageFranchiseeModalParents';
import { Filter } from 'components/users-page/filter/Filter';

const UsersPage = observer(() => {
  const {
    users,
    usersTotalCount,
    createUser,
    getOneUser,
    currentUser,
    page,
    perPage,
    getFilteredUsers,
    setSearchUsersParams,
  } = usersStore;
  const { getFranchisee } = franchiseeStore;
  const { getGroups } = groupStore;
  const { getTariffs } = tariffsStore;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setSearchUsersParams({ page: newCurrentPage - 1 });
    setCurrentPage(newCurrentPage);
    getFilteredUsers();
  };

  const onAddUser = (data: RequestRegister) => {
    setIsModalOpen(false);
    createUser(data);
  };

  const onEditUserClick = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    getFranchisee();
    getGroups();
    getTariffs();
    getFilteredUsers();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Filter setIsModalOpen={setIsModalOpen} />
      <div className={styles.cardWrapper}>
        {users.map(user => (
          <CardStudentExtended
            getOneUser={getOneUser}
            key={user.id}
            user={user}
            onEditUserClick={onEditUserClick}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={Math.ceil(usersTotalCount / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
      <BasicModal visibility={modals.isParents} changeVisibility={modals.changeParents}>
        <StudentPageFranchiseeModalParents user={currentUser} onCloseModal={modals.changeParents} />
      </BasicModal>
      <BasicModal visibility={isModalOpen} changeVisibility={setIsModalOpen}>
        <StudentPageFranchiseeModalAddUser onCloseModal={() => setIsModalOpen(false)} />
      </BasicModal>
      <BasicModal visibility={modals.isSetting} changeVisibility={() => modals.changeSetting()}>
        <StudentPageFranchiseeModalAddUser
          onCloseModal={() => modals.changeSetting()}
          visibility={modals.isSetting}
          user={currentUser}
        />
      </BasicModal>
    </div>
  );
});

export default UsersPage;
