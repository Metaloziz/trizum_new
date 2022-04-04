import Image from 'next/image';
import React, { FC } from 'react';
import iconFlag from '@svgs/flag.svg';
import styles from './CardStudent.module.scss';

const CardStudent = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.student}>
        <img src={'/img/pervoklasnin.jpg'} alt={'student'} />
      </div>
      <div className={styles.information}>
        <h3>Днепровский Александр Алексеевич</h3>
        <div className={styles.list}>
          <ul>
            <li>Статус:</li>
            <li>Ученик</li>
          </ul>
          <ul>
            <li>Город:</li>
            <li>Москва</li>
          </ul>
          <ul>
            <li>Телефон:</li>
            <li>+7(950)55 33 570</li>
          </ul>
          <ul>
            <li>Дата рождения:</li>
            <li>03.09.1993 г.</li>
          </ul>
          <ul>
            <li>Почта:</li>
            <li>sanya@yandex.ru</li>
          </ul>
        </div>
      </div>
      <div className={styles.flag}>
        <Image src={iconFlag} width={'33'} height={'33'} alt={'Flag'} />
      </div>
    </div>
  );
};

export default CardStudent;
