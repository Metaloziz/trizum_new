import Image from 'next/image';
import React, { FC } from 'react';
import CardStudentButtonGroup from '@components/card-student/card-student-for-teacher/card-student-button-group/CardStudentButtonGroup';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import avatar from '@public/img/pervoklasnin.jpg';
import iconSettings from '@svgs/icon-settings.svg';
import styles from './CardStudentExtended.module.scss';

const data = [
  { title: 'Статус', description: 'Ученик' },
  { title: 'Город', description: 'Москва' },
  { title: 'Телефон', description: '+7(950)55 33 570' },
  { title: 'Дата рождения', description: '03.09.1993 г.' },
  { title: 'Почта', description: 'sanya@yandex.ru' },
];

interface Props {
  title: string;
}

const CardStudentExtended: FC<Props> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant={'circle'}>
          <Image src={avatar} width={'170'} height={'170'} alt={'student'} />
        </CustomImageWrapper>
        <div>
          <CardStudentTitle>{title}</CardStudentTitle>
          <div className={styles.mt20}>
            {data.map((item) => (
              <ul key={item.title} className={styles.list}>
                <li>{item.title}:</li>
                <li>{item.description}</li>
              </ul>
            ))}
          </div>
        </div>
        <CardStudentButtonGroup />
      </div>
      <CustomImageWrapper className={styles.settings}>
        <Image src={iconSettings} width={'30'} height={'30'} alt={'Settings'} />
      </CustomImageWrapper>
    </div>
  );
};

export default CardStudentExtended;
