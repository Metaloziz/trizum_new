import React, { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

import { SexEnum } from 'app/enums/CommonEnums';
import store, { RoleNames, Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import TextFieldCalendar from 'components/text-field-calendar/TextFieldCalendar';
import TextField from 'components/text-field/TextField';
import StudentPageTitle from 'components/users-page/student-page-title/StudentPageTitle';
import StudentParents from 'components/users-page/student-parents/StudentParent';
import avatar from 'public/img/pervoklasnin.jpg';

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
  city: Option;
  phone?: string;
  birthdate: string | undefined;
  email?: string;
  // group: Option | undefined;
  // teacher: string;
  image?: string;
};

const cities = ['Moscow'];

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
const citiesOptions: Option[] = cities.map(el => ({ label: el, value: el }));
const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

const StudentPageFranchiseeModalAddUser: FC<Props> = observer(props => {
  const { onCloseModal, user } = props;
  const { getGroups, groups } = groupStore;
  const { createUser } = usersStore;
  const [image, setImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  // const [groupOptions, setGroupOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (groups.length) {
      // setGroupOptions(groups.map(el => ({ label: el.code, value: el.id })));
    }
  }, [groups]);

  useEffect(() => {
    // debugger
    if (user) {
      // const userRole = roleOptions.filter(el => el.label === user.roleCode)[0];
      // const userCity = user.city
      //   ? citiesOptions.filter(el => el.label === user.city)[0]
      //   : citiesOptions[0];
      // const userSex = sexOptions.find(el => el.label === checkSex(user.sex));
      //
      // reset({
      //   phone: user.phone ?? '',
      //   role: userRole,
      //   city: userCity,
      //   lastName: user.lastName,
      //   middleName: user.middleName ?? '',
      //   sex: userSex,
      //   birthdate: moment(user.birthdate.date).format(DateTime.DdMmYyyy),
      //   email: user.email ?? '',
      //   firstName: user.firstName,
      // });
    }
  }, [user]);

  const defaultValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    role: roleOptions[0],
    sex: sexOptions[0],
    city: citiesOptions[0],
    phone: '',
    birthdate: '',
    email: '',
    // group: undefined,
    // teacher: '',
  };

  const load = async () => {
    try {
      const res = await getGroups();
      // setGroupOptions(res.map(el => ({ label: el.code, value: el.id })));
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const schema = yup.object().shape({
    firstName: yup.string().required('Обязательное поле'),
    middleName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    role: yup.object().required('Обязательное поле'),
    sex: yup.object().required('Обязательное поле'),
    city: yup.object().required('Обязательное поле'),
    // phone: yup.string().required('Обязательное поле'), // todo как сделать не обязательным ?
    birthdate: yup.string().required('Обязательное поле'),
    // email: yup.string().required('Обязательное поле').email(), // todo как сделать не обязательным ?
    // group: yup.object().required('Обязательное поле'),
    // teacher: yup.string().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const [isParentShown, setIsParentShown] = useState(false);
  const [studentId, setStudentId] = useState('');
  const selectedRole = watch('role').value;

  const onAddClick = async (values: AddUserT) => {
    const qwe: RequestRegister = {
      sex: (values.sex?.label as SexEnum) === SexEnum.Male,
      // todo: грузить франчайзи
      franchiseId: '1ecf563a-2a69-6610-a812-f92a3af0f8be',
      tariffId: '',
      birthdate: values.birthdate || '',
      city: values.city.label,
      role: values.role.value as Roles,
      // email: values.email,
      // groupId: values.group?.value || '',
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      // phone: values.phone ,
      isSecondChild: false,
    };

    const res = await createUser(qwe);
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

  const checkSex = (value: boolean | null): SexEnum => {
    if (value) {
      return SexEnum.Male;
    }
    if (typeof value === 'boolean' && !value) {
      return SexEnum.Female;
    }
    return SexEnum.Male;
  };

  const onSubmit: SubmitHandler<AddUserT> = data => console.log(data);

  return (
    <div className={styles.wrapper}>
      <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
      <div className={styles.row}>
        <div className={styles.imageWrapper}>
          <Image src={avatar} width="290" height="290" alt="student" />
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
                <CustomSelect
                  {...field}
                  title="Город"
                  options={citiesOptions}
                  // @ts-ignore
                  error={errors.city?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="role"
              render={({ field }) => (
                <CustomSelect
                  {...field}
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
            <div className={styles.infoItem}>
              <span>Дата рождения:</span>
              <Controller
                name="birthdate"
                render={({ field }) => <TextFieldCalendar {...field} dataAuto="" />}
                control={control}
              />
            </div>
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
              <button type="submit">
                <Button>Сохранить</Button>
              </button>
            </div>
          </form>
        </div>
      </div>

      {isParentShown && studentId && (
        <StudentParents studentId={studentId} onCloseModal={onCloseModal} />
      )}
    </div>
  );
});

export default StudentPageFranchiseeModalAddUser;
