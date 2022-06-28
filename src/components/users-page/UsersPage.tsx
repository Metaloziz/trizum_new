import React, { useEffect, useState } from 'react';

import authService from '@app/services/authService';
import usersService, { ResponseUserT } from '@app/services/usersService';
import usersStore from '@app/stores/usersStore';
import { RequestRegister } from '@app/types/AuthTypes';
import { UserT } from '@app/types/UserTypes';
import BasicModal from '@components/basic-modal/BasicModal';
import CardStudentExtended from '@components/card-student/card-student-extended/CardStudentExtended';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import StudentPageFranchiseeModalAddUser from '@components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser';
import StudentPageFranchiseeModalParents from '@components/users-page/student-page-franchisee-modal-parents/StudentPageFranchiseeModalParents';
import StudentPageFranchiseeModalSetting from '@components/users-page/student-page-franchisee-modal-setting/StudentPageFranchiseeModalSetting';
import mockAvatar from '@public/img/pervoklasnin.jpg';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import modals from '../../app/stores/CardStudentExtended';

import styles from './UsersPage.module.scss';

const UsersPage = observer(() => {
  const { users, usersTotalCount, getUsers,createUser } = usersStore;
  const [isModalAddUser, setModalAddUser] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const load = async () => {
    await getUsers();
    setIsLoaded(true);
  };
  const onAddUser = (data: RequestRegister) => {
    setModalAddUser(false);
    createUser(data);
  };
  useEffect(() => {
    load();
  }, []);

  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <div className={styles.column}>
          <InformationItem variant="calendar" title="Дата" dataAuto="date" />
          <InformationItem variant="select" title="Выполнил Д/З" />
          <InformationItem variant="select" title="Город" />
          <InformationItem variant="select" title="Группа" />
        </div>
        <div className={styles.column}>
          <InformationItem variant="select" title="Оплачен" />
          <InformationItem variant="select" title="Роль" />
          <InformationItem variant="select" title="Статус" />
          <InformationItem variant="select" title="Юр.лицо" />
        </div>
        <div className={cn(styles.column, styles.flexColumn)}>
          <div>
            <InformationItem variant="calendar" title="Дата рождения" dataAuto="birthDate" />
            <InformationItem variant="input" title="ФИО" />
          </div>
          <div className={styles.buttons}>
            <CustomButton size="small">Найти</CustomButton>
            <CustomButton type="addUser" size="small" onClick={() => setModalAddUser(true)}>
              Добавить пользователя
            </CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.cardWrapper}>
        {users.map(u => (
          <CardStudentExtended key={u.id} user={u} />
        ))}
      </div>
      <BasicModal visibility={modals.isParents} changeVisibility={() => modals.changeParents()}>
        <StudentPageFranchiseeModalParents />
      </BasicModal>
      <BasicModal visibility={isModalAddUser} changeVisibility={setModalAddUser}>
        <StudentPageFranchiseeModalAddUser onAddUser={onAddUser} />
      </BasicModal>
      <BasicModal visibility={modals.isSetting} changeVisibility={() => modals.changeSetting()}>
        <StudentPageFranchiseeModalSetting />
      </BasicModal>
    </div>
  );
});

export default UsersPage;
