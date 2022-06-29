import React, { FC, useEffect, useState } from 'react';

import authService from '@app/services/authService';
import groupsService from '@app/services/groupsService';
import { Roles } from '@app/stores/appStore';
import { RequestRegister } from '@app/types/AuthTypes';
import CustomButton from '@components/custom-button/CustomButton';
import CustomSelect, { Option } from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-field/TextField';
import StudentPageTitle from '@components/users-page/student-page-title/StudentPageTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import avatar from '@public/img/pervoklasnin.jpg';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

type Props = {
  onAddUser: (data: RequestRegister) => void;
};

type AddUserT = {
  firstName: string;
  middleName: string;
  lastName: string;
  role: Option | undefined;
  sex: Option | undefined;
  city: string;
  phone: string;
  birthdate: string | undefined;
  email: string;
  group: Option | undefined;
  teacher: Option | undefined;
  // teacher: string;
  image?: string;
};

export enum SexEnum {
  Male = 'Мужской',
  Female = 'Женский',
}

export const RoleNames = {
  teacher: 'Учитель',
  student: 'Ученик',
  teacherEducation: 'Учитель на обучении',
  franchise: 'Франчайзи',
};
const teachers = ['Иванов'];
const cities = ['Moscow'];

const roleOptions = [
  { label: RoleNames.student, value: Roles.Student },
  { label: RoleNames.teacher, value: Roles.Teacher },
  { label: RoleNames.teacherEducation, value: Roles.TeacherEducation },
  { label: RoleNames.franchise, value: Roles.Franchisee },
];
const citiesOptions = cities.map(el => ({ label: el, value: el }));
const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

const defaultValues: AddUserT = {
  firstName: '',
  middleName: '',
  lastName: '',
  role: roleOptions[0],
  sex: undefined,
  city: '',
  phone: '',
  birthdate: undefined,
  email: '',
  group: undefined,
  teacher: undefined,
  // teacher: '',
};

const StudentPageFranchiseeModalAddUser: FC<Props> = props => {
  const { onAddUser } = props;
  const [image, setImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState<Option[]>([]);
  const load = async () => {
    try {
      const res = await groupsService.getGroups();
      const groupOptions: Option[] = res.map(el => ({ label: el.code, value: el.id }));
      setGroups(groupOptions);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoaded(true);
    }
  };
  const schema = yup.object().shape({
    firstName: yup.string().required('Обязательное поле'),
    middleName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    role: yup.object().required('Обязательное поле'),
    sex: yup.object().required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле'),
    birthdate: yup.string().required('Обязательное поле'),
    email: yup.string().required('Обязательное поле').email(),
    group: yup.object().required('Обязательное поле'),
    teacher: yup.object().required('Обязательное поле'),
    // teacher: yup.string().required('Обязательное поле'),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const onAddClick = async (values: AddUserT) => {
    const qwe: RequestRegister = {
      isSecondChild: false,
      sex: (values.sex?.label as SexEnum) === SexEnum.Male,
      franchiseId: '1ecf563a-2a69-6610-a812-f92a3af0f8be',
      tariffId: '',
      birthdate: values.birthdate || '',
      city: values.city,
      role: values.role?.value || '',
      groupId: values.group?.value || '',
      teacherId: values.teacher?.value || '',
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      phone: values.phone,
    };
    onAddUser(qwe);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
      <div className={styles.row}>
        <div className={styles.imageWrapper}>
          <Image src={avatar} width="290" height="290" alt="student" />
        </div>
        <div className={styles.table}>
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
            name='lastName'
            render={({ field }) => (
              <TextField {...field} label='Отчество' error={errors.lastName?.message} />
            )}
            control={control}
          />
          <div className={styles.roleSex}>
            <Controller
              name='role'
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  title='Роль'
                  options={roleOptions}
                  // @ts-ignore
                  error={errors.role?.message}
                />
              )}
              control={control}
            />
            <Controller
              name='sex'
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  title='Пол'
                  options={sexOptions}
                  // @ts-ignore
                  error={errors.sex?.message}
                />
              )}
              control={control}
            />
          </div>
          <Controller
            name='city'
            render={({ field }) => (
              <TextField {...field} label='Город' error={errors.lastName?.message} />
            )}
            control={control}
          />
          <Controller
            name='phone'
            render={({ field }) => (
              <TextField {...field} label="Телефон" error={errors.phone?.message} />
            )}
            control={control}
          />
          <div className={styles.infoItem}>
            <span>Дата рождения:</span>
            <Controller
              name='birthdate'
              render={({ field }) => <TextFieldCalendar {...field} dataAuto='' />}
              control={control}
            />
          </div>
          <div className={styles.emailChoice}>
            <Controller
              name='email'
              render={({ field }) => (
                <TextField {...field} label='Почта' error={errors.email?.message} />
              )}
              control={control}
            />
          </div>
          <div className={styles.choiceGroup}>
            <Controller
              name='teacher'
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  title='Учитель'
                  options={groups}
                  // @ts-ignore
                  error={errors.group?.message}
                />
              )}
              control={control}
            />
            <Controller
              name='group'
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  title='Группа'
                  options={groups}
                  // @ts-ignore
                  error={errors.group?.message}
                />
              )}
              control={control}
            />
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <CustomButton onClick={handleSubmit(onAddClick)}>Сохранить</CustomButton>
      </div>
    </div>
  );
};

export default StudentPageFranchiseeModalAddUser;
