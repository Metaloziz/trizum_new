import React from 'react';

import InformationItem from '@components/information-item/InformationItem';
import avatar from '@public/img/pervoklasnin.jpg';
import Image from 'next/image';
import { Controller } from 'react-hook-form';

import styles from './StudentInformation.module.scss';

const StudentInformation = () => (
  <div className={styles.row}>
    <div className={styles.imageWrapper}>
      <Image src={avatar} width="290" height="290" alt="student" />
    </div>
    <div className={styles.table}>
      <div className={styles.table}>
        <div className={styles.infoItem}>
          <span>Фамилия:</span>
          <Controller
            name="name"
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
      </div>
    </div>
  </div>
);

export default StudentInformation;
