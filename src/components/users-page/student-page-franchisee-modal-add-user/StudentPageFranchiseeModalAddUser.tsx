import React, { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

import { SexEnum } from 'app/enums/CommonEnums';
import usersService from 'app/services/usersService';
import { RoleNames, Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import SetStatusButton from 'components/button-open-close/SetStatusButton';
import Button from 'components/button/Button';
import { Divider } from 'components/divider/Divider';
import Image from 'components/image/Image';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import TextFieldCalendar from 'components/text-field-calendar/TextFieldCalendar';
import TextField from 'components/text-field/TextField';
import { StudentParentsFormContainer } from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import avatar from 'public/img/avatarDefault.png';

type Props = {
  onCloseModal: () => void;
  user?: ResponseOneUser;
};

type AddUserT = {
  firstName: string;
  middleName: string;
  lastName: string;
  role: Option;
  sex: Option | undefined;
  city: string;
  phone?: string;
  birthdate: string | undefined;
  email?: string;
  // group: Option | undefined;
  // teacher: string;
  image?: string;
};

const roleOptions = [
  { label: RoleNames.student, value: Roles.Student },
  // { label: RoleNames.parent, value: Roles.Parent },
  { label: RoleNames.teacherEducation, value: Roles.TeacherEducation },
  { label: RoleNames.teacher, value: Roles.Teacher },
  { label: RoleNames.franchiseeAdmin, value: Roles.FranchiseeAdmin },
  { label: RoleNames.franchisee, value: Roles.Franchisee },
  { label: RoleNames.tutor, value: Roles.Tutor },
  { label: RoleNames.methodist, value: Roles.Methodist },
  { label: RoleNames.admin, value: Roles.Admin },
];

const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

const StudentPageFranchiseeModalAddUser: FC<Props> = observer(({ user, onCloseModal }) => {
  const { getGroups, groups } = groupStore;
  const { createUser, currentUser } = usersStore;
  const { updateUser } = usersService;
  const [image, setImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isParentShown, setIsParentShown] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [selectedRole1, setSelectedRole1] = useState<Roles>();
  // const [groupOptions, setGroupOptions] = useState<Option[]>([]);

  let selectedRole = '';

  const findRole = () => roleOptions.find(el => el.value === user?.roleCode);
  const findSex = () => (user?.sex ? sexOptions[0] : sexOptions[1]);

  const defaultValues = {
    firstName: user?.firstName || '',
    middleName: user?.middleName || '',
    lastName: user?.lastName || '',
    role: findRole() || roleOptions[0],
    sex: findSex() || sexOptions[0],
    city: user?.city || '',
    phone: user?.phone || '',
    birthdate: user?.birthdate?.date || '01.01.2000', // todo как установить дату от юзера, так как при записи user?.birthdate ?
    email: user?.email || '',
    // group: undefined,
    // teacher: '',
  };

  console.log(user);

  const schema = yup.object().shape({
    firstName: yup.string().required('Обязательное поле'),
    middleName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    role: yup.object().required('Обязательное поле'),
    sex: yup.object().required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    phone:
      selectedRole1 === Roles.Student
        ? yup.string().notRequired()
        : yup.string().required('Обязательное поле'),
    birthdate: yup.string().required('Обязательное поле'),
    email:
      selectedRole1 === Roles.Student
        ? yup.string().notRequired()
        : yup.string().required('Обязательное поле').email(),
    // group: yup.object().required('Обязательное поле'),
    // teacher: yup.string().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  selectedRole = watch('role').value;

  const onSubmit: SubmitHandler<AddUserT> = async values => {
    const newUserData: RequestRegister = {
      sex: (values.sex?.label as SexEnum) === SexEnum.Male,
      // todo: грузить франчайзи
      franchiseId: '1ecf563a-2a69-6610-a812-f92a3af0f8be',
      tariffId: '',
      birthdate: values.birthdate || '',
      city: values.city,
      role: values.role.value as Roles,
      email: values.email,
      // groupId: values.?.value || '',
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      phone: values.phone,
      isSecondChild: false,
    };

    let res;

    if (user) {
      res = await updateUser(newUserData, user.id); // todo так вообще норм писать ?
    } else {
      res = await createUser(newUserData);
    }

    if ((values.role.value as Roles) !== Roles.Student) {
      onCloseModal();
      reset();
      return;
    }
    if (res?.id) {
      setStudentId(res.id);
      setIsParentShown(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Добавление/изменение пользователя</h2>
      <div className={styles.row}>
        <div className={styles.imageWrapper}>
          <Image src={avatar} width="290" height="290" alt="student" />
          {user && <SetStatusButton status={user?.status} id={user.id} />}
        </div>
        <div className={styles.table}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="middleName"
              render={({ field }) => (
                <TextField {...field} label="Фамилия" error={errors.middleName?.message} />
              )}
              control={control}
            />
            <Controller
              name="firstName"
              render={({ field }) => (
                <TextField {...field} label="Имя" error={errors.firstName?.message} />
              )}
              control={control}
            />
            <Controller
              name="lastName"
              render={({ field }) => (
                <TextField {...field} label="Отчество" error={errors.lastName?.message} />
              )}
              control={control}
            />
            <Controller
              name="city"
              render={({ field }) => (
                <TextField {...field} label="Город" error={errors.lastName?.message} />
              )}
              control={control}
            />
            <Controller
              name="role"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  onChange={e => {
                    setSelectedRole1(e.value as Roles);
                    field.onChange(e);
                  }}
                  title="Роль"
                  options={roleOptions}
                  // @ts-ignore
                  error={errors.role?.message}
                />
              )}
              control={control}
            />
            {selectedRole !== Roles.Student && (
              <Controller
                name="phone"
                render={({ field }) => (
                  <TextField {...field} label="Телефон" error={errors.phone?.message} />
                )}
                control={control}
              />
            )}
            {/* <div className={styles.infoItem}>
              <span>Дата рождения:</span>
              <Controller
                name="birthdate"
                render={({ field }) => (
                  <TextFieldCalendar
                    {...field}
                    dataAuto=""
                    value="01.01.2000"
                    onChange={e => console.log(e)}
                  /> // todo value="01.01.2000" for dev
                )}
                control={control}
              />
            </div> */}
            <Controller
              name="birthdate"
              render={({ field }) => (
                <TextField {...field} label="Дата рождения:" /> // todo value="01.01.2000" for dev
              )}
              control={control}
            />
            {selectedRole !== Roles.Student && (
              <Controller
                name="email"
                render={({ field }) => (
                  <TextField {...field} label="Почта" error={errors.email?.message} />
                )}
                control={control}
              />
            )}
            <Controller
              name="sex"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  title="Пол"
                  options={sexOptions}
                  // @ts-ignore
                  error={errors.sex?.message}
                />
              )}
              control={control}
            />
            {/*   <Controller
            name="group"
            render={({ field }) => (
              <CustomSelect
                {...field}
                title="Группа"
                options={groupOptions}
                // @ts-ignore
                error={errors.group?.message}
              />
            )}
            control={control}
          /> */}
            <div className={styles.button}>
              <Button type="submit" disabled={isSubmitSuccessful}>
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
      {user?.parents && (
        <StudentParentsFormContainer
          studentId={studentId}
          onCloseModal={onCloseModal}
          parents={user.parents}
        />
      )}
      {isParentShown && studentId && (
        <StudentParentsFormContainer studentId={studentId} onCloseModal={onCloseModal} />
      )}
    </div>
  );
});

export default StudentPageFranchiseeModalAddUser;
