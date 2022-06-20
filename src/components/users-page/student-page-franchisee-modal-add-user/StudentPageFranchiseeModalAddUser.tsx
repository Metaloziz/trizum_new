import React, { useState } from 'react';

import { Roles } from '@app/stores/appStore';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import StudentInformation from '@components/users-page/student-information/StudentInformation';
import StudentPageTitle from '@components/users-page/student-page-title/StudentPageTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import avatar from '@public/img/pervoklasnin.jpg';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

type AddUserT = {
  name: string;
  surname: string;
  patronymic: string;
  role: Roles;
  sex: string;
  city: string;
  phone: string;
  birthday: string;
  email: string;
  group: string;
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
const groups = ['группа 1'];
const roleOptions = Object.values(RoleNames).map(el => ({ label: el, value: el }));
const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));
const teacherOptions = teachers.map(el => ({ label: el, value: el }));
const groupOptions = groups.map(el => ({ label: el, value: el }));
const defaultValues: AddUserT = {
  name: '',
  surname: '',
  patronymic: '',
  role: Roles.Student,
  sex: '',
  city: '',
  phone: '',
  birthday: '',
  email: '',
  group: '',
  // teacher: '',
};

const StudentPageFranchiseeModalAddUser = () => {
  const [image, setImage] = useState('');
  const schema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    surname: yup.string().required('Обязательное поле'),
    patronymic: yup.string().required('Обязательное поле'),
    role: yup.string().required('Обязательное поле'),
    sex: yup.string().required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле'),
    birthday: yup.string().required('Обязательное поле'),
    email: yup.string().required('Обязательное поле').email(),
    group: yup.string().required('Обязательное поле'),
    // teacher: yup.string().required('Обязательное поле'),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });
  console.log(errors);
  const onAddClick = (values: AddUserT) => {
    console.log(values, 'values');
  };
  return (
    <div className={styles.wrapper}>
      <StudentPageTitle>Добавление/изменение пользователя</StudentPageTitle>
      <div className={styles.row}>
        <div className={styles.imageWrapper}>
          <Image src={avatar} width="290" height="290" alt="student" />
        </div>
        <div className={styles.table}>
          <div className={styles.table}>
            <div className={styles.infoItem}>
              <span>Фамилия:</span>
              <Controller
                name="surname"
                render={({ field }) => <InformationItem {...field} title="" variant="input" />}
                control={control}
              />
              {errors.surname?.message}
            </div>
            <div className={styles.infoItem}>
              <span>Имя:</span>
              <Controller
                name="name"
                render={({ field }) => <InformationItem {...field} title="" variant="input" />}
                control={control}
              />
              {errors.name?.message}
            </div>
            <div className={styles.infoItem}>
              <span>Отчество:</span>
              <Controller
                name="patronymic"
                render={({ field }) => <InformationItem {...field} title="" variant="input" />}
                control={control}
              />
              {errors.patronymic?.message}
            </div>
            <div className={styles.selectWrapper}>
              <div className={styles.selectWidth}>
                <Controller
                  render={({ field }) => (
                    <InformationItem
                      {...field}
                      variant="select"
                      title="Роль:"
                      option={roleOptions}
                    />
                  )}
                  name="role"
                  control={control}
                />
              </div>
            </div>
            <div className={styles.infoItem}>
              <span>Город:</span>
              <Controller
                name="city"
                render={({ field }) => <InformationItem {...field} title="" variant="input" />}
                control={control}
              />
            </div>
            <div className={styles.infoItem}>
              <span>Телефон:</span>
              <Controller
                name="phone"
                render={({ field }) => (
                  <InformationItem
                    {...field}
                    title=""
                    onChangeEvent={field.onChange}
                    variant="phone"
                  />
                )}
                control={control}
              />
            </div>
            <div className={styles.infoItem}>
              <span>Дата рождения:</span>
              <Controller
                name="birthday"
                render={({ field }) => <InformationItem {...field} title="" variant="calendar" />}
                control={control}
              />
            </div>
            <div className={styles.infoItem}>
              <span>Почта:</span>
              <Controller
                name="email"
                render={({ field }) => <InformationItem {...field} title="" variant="input" />}
                control={control}
              />
            </div>
            <div className={styles.selectWrapper}>
              <div className={styles.selectWidth}>
                <Controller
                  name="sex"
                  render={({ field }) => (
                    <InformationItem {...field} variant="select" title="Пол:" option={sexOptions} />
                  )}
                  control={control}
                />
              </div>
            </div>
            {/*  <div className={styles.selectWrapper}>
              <div className={styles.selectWidth}>
                <Controller
                  name="teacher"
                  render={({ field }) => (
                    <InformationItem
                      {...field}
                      variant="select"
                      title="Учитель:"
                      option={teacherOptions}
                    />
                  )}
                  control={control}
                />
              </div>
            </div> */}
            <div className={styles.selectWrapper}>
              <div className={styles.selectWidth}>
                <Controller
                  name="group"
                  render={({ field }) => (
                    <InformationItem
                      {...field}
                      variant="select"
                      title="Группа:"
                      option={groupOptions}
                    />
                  )}
                  control={control}
                />
              </div>
            </div>
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
