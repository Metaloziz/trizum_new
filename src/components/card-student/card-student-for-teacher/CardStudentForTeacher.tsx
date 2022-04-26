import Image from 'next/image';
import React, { FC, useState } from 'react';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import avatar from '@public/img/pervoklasnin.jpg';
import iconFlag from '@svgs/flag.svg';
import styles from './CardStudentForTeacher.module.scss';

const data = [
  { title: 'Статус', description: 'Ученик' },
  { title: 'Город', description: 'Москва' },
  { title: 'Телефон', description: '+7(950)55 33 570' },
  { title: 'Дата рождения', description: '03.09.1993 г.' },
  { title: 'Почта', description: 'sanya@yandex.ru' },
];

interface Props {
  title: string;
  flag?: boolean;
}

const CardStudentForTeacher: FC<Props> = ({ title, flag }) => {
  const [showFlag, setShowFlag] = useState<boolean | undefined>(flag);

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
      </div>
      <CustomImageWrapper className={styles.flag} variant={'none'}>
        {showFlag && (
          <Image src={iconFlag} width={'33'} height={'33'} alt={'Flag'} />
        )}
      </CustomImageWrapper>
    </div>
  );
};

export default CardStudentForTeacher;
