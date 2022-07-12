import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import Image from 'components/image/Image';
import InformationItem from 'components/information-item/InformationItem';
import styles from 'components/users-page/student-information-form/StudentInformationForm.module.scss';
import avatar from 'public/img/avatarDefault.png';

const StudentInformationForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
    watch,
  } = useForm({ mode: 'onChange', shouldFocusError: true });

  const onSubmit = () => {
    console.log('click');
  };

  return (
    <div className={styles.row}>
      <div className={styles.imageWrapper}>
        <Image src={avatar} width="290" height="290" alt="student" />
      </div>
      <div className={styles.table}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <div className={styles.infoItem}>
          <span>Фамилия:</span>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <InformationItem {...field} title="" variant="input" />}
          />
        </div>
        <div className={styles.selectWrapper}>
          <div className={styles.selectWidth}>
            <InformationItem variant="select" title="Роль:" />
          </div>
        </div>
        <div className={styles.infoItem}>
          <span>Город:</span>
          <InformationItem title="" variant="input" />
        </div>
        <div className={styles.infoItem}>
          <span>Телефон:</span>
          <InformationItem title="" variant="input" />
        </div>
        <div className={styles.infoItem}>
          <span>Дата рождения:</span>
          <InformationItem title="" variant="input" />
        </div>
        <div className={styles.infoItem}>
          <span>Почта:</span>
          <InformationItem title="" variant="input" />
        </div>
        <div className={styles.selectWrapper}>
          <div className={styles.selectWidth}>
            <InformationItem variant="select" title="Пол:" />
          </div>
        </div>
        <div className={styles.selectWrapper}>
          <div className={styles.selectWidth}>
            <InformationItem variant="select" title="Учитель:" />
          </div>
        </div>
        <div className={styles.selectWrapper}>
          <div className={styles.selectWidth}>
            <InformationItem variant="select" title="Группа:" />
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default StudentInformationForm;
