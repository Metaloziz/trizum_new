import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import modals from '../../app/stores/CardStudentExtended'; 

import { Filter } from './Filter';
import styles from './UsersPage.module.scss';

import { RoleNames, Roles } from 'app/stores/appStore';
import franchiseeStore from 'app/stores/franchiseeStore';
import groupStore from 'app/stores/groupStore';
import tariffsStore from 'app/stores/tariffsStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import CardStudentExtended from 'components/card-student/card-student-extended/CardStudentExtended';
import InformationItem from 'components/information-item/InformationItem';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import TextFieldCalendar from 'components/text-field-calendar/TextFieldCalendar';
import StudentPageFranchiseeModalAddUser from 'components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser';
import StudentPageFranchiseeModalParents from 'components/users-page/student-page-franchisee-modal-parents/StudentPageFranchiseeModalParents';

const roleOptions = [
  { label: 'Все', value: 'all' },
  { label: RoleNames.student, value: Roles.Student },
  { label: RoleNames.parent, value: Roles.Parent },
  { label: RoleNames.teacherEducation, value: Roles.TeacherEducation },
  { label: RoleNames.teacher, value: Roles.Teacher },
  { label: RoleNames.franchiseeAdmin, value: Roles.FranchiseeAdmin },
  { label: RoleNames.franchisee, value: Roles.Franchisee },
  { label: RoleNames.tutor, value: Roles.Tutor },
  { label: RoleNames.methodist, value: Roles.Methodist },
  { label: RoleNames.admin, value: Roles.Admin },
];

const UsersPage = observer(() => {
  const { users, usersTotalCount, getUsers, createUser, getOneUser, currentUser, page, perPage } =
    usersStore;

  const { getFranchisee } = franchiseeStore;
  const { getGroups } = groupStore;
  const { getTariffs } = tariffsStore;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [selectedRole, setSelectedRole] = useState<Option>();

  const onSelectRole = (option: Option) => {
    option.value === 'all' ? setSelectedRole(undefined) : setSelectedRole(option);
  };

  const load = async () => {
    await getUsers();
    setIsLoaded(true);
  };

  const onSearchClick = () => {
    getUsers({ role: selectedRole?.value as Roles, page: currentPage });
  };

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    getUsers({ page: newCurrentPage - 1, role: selectedRole?.value as Roles });
  };

  const onAddUser = (data: RequestRegister) => {
    setIsModalOpen(false);
    createUser(data);
  };

  const onEditUserClick = (id: string) => {
    console.log(id);
    // const res = await getOneUser(id);
    // if (res) {
    //   setCurrentUser(res);
    //   setIsModalOpen(true);
    // }
  };

  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const [mainData, setMainData] = React.useState<Date | null>(
      new Date('2015-08-18T21:11:54'),
  );

  const handleChangeMainData = (newValue: Date | null) => {
    setMainData(newValue);
  };

  const [value, setValue] = React.useState<Date | null>(
      new Date('2014-08-18T21:11:54'),
  );

  const handleChangeBornData = (newValue: Date | null) => {
    setValue(newValue);
  };

  useEffect(() => {
    load();
    getFranchisee();
    getGroups();
    getTariffs();
  }, []);

  const setDate = (e: ChangeEvent<HTMLInputElement>) => {};

  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.wrapper}>
      <Filter setIsModalOpen={setIsModalOpen}/>
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
          count={Math.floor(usersTotalCount / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          defaultValue={0}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
      <BasicModal visibility={modals.isParents} changeVisibility={() => modals.changeParents()}>
        <StudentPageFranchiseeModalParents />
      </BasicModal>
      <BasicModal visibility={isModalOpen} changeVisibility={setIsModalOpen}>
        <StudentPageFranchiseeModalAddUser onCloseModal={() => setIsModalOpen(false)} />
      </BasicModal>
      <BasicModal visibility={modals.isSetting} changeVisibility={() => modals.changeSetting()}>
        {/* <StudentPageFranchiseeModalSetting /> */}
        <StudentPageFranchiseeModalAddUser
          onCloseModal={() => modals.changeSetting()}
          user={currentUser}
        />
      </BasicModal>
    </div>
  );
});

export default UsersPage;
