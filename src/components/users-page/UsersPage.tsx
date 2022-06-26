import React, { useEffect, useState } from 'react';

import authService from '@app/services/authService';
import usersService, { ResponseUserT } from '@app/services/usersService';
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

const mockUser: Partial<UserT> = {
  birthdate: {
    date: '20.01.2000',
    timezone: '',
    timezone_type: '',
  },
  city: 'Moscow',
  role: 'student',
  email: 'asd@asd.asd',
  firstName: 'Al',
  middleName: 'Co',
  lastName: 'Party',
  status: 'student',
  avatar: {
    path: mockAvatar as unknown as string,
    id: '',
  },
  phone: '79005005555',
};

const UsersPage = observer(() => {
  const [isModalAddUser, setModalAddUser] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<ResponseUserT[]>([]);

  const load = async () => {
    try {
      const res = await usersService.getAllUsers();
      setUsers(res.reverse());
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoaded(true);
    }
  };
  const onAddUser = async (data: RequestRegister) => {
    setModalAddUser(false);
    try {
      const res = await authService.register(data);
      const resUsers = await usersService.getAllUsers();
      setUsers(resUsers.reverse());
      console.log(resUsers, 'res');
    } catch (e) {
      console.log(e);
    }
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
