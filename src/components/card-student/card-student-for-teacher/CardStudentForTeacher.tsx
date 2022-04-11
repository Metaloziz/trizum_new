import Image from 'next/image';
import React, { FC, useState } from 'react';
import CardStudentButtonGroup from '@components/card-student/card-student-for-teacher/card-student-button-group/CardStudentButtonGroup';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import avatar from '@public/img/pervoklasnin.jpg';
import iconFlag from '@svgs/flag.svg';
import iconSettings from '@svgs/icon-settings.svg';
import styles from './CardStudentForTeacher.module.scss';

const data = [
  { title: 'Статус', description: 'Ученик' },
  { title: 'Город', description: 'Москва' },
  { title: 'Телефон', description: '+7(950)55 33 570' },
  { title: 'Дата рождения', description: '03.09.1993 г.' },
  { title: 'Почта', description: 'sanya@yandex.ru' },
];

type SizeType = 'large' | 'normal';

interface Props {
  title: string;
  flag?: boolean;
  size?: SizeType;
}

const CardStudentForTeacher: FC<Props> = ({ title, flag, size = 'large' }) => {
  const [showFlag, setShowFlag] = useState<boolean | undefined>(flag);

  const sizeStyle = size === 'large' ? styles.large : '';
  const finalStyle = `${styles.wrapper} ${sizeStyle}`;

  return (
    <div className={finalStyle}>
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
        {size === 'large' && <CardStudentButtonGroup />}
      </div>
      <CustomImageWrapper className={styles.flag} variant={'none'}>
        {size === 'normal' && showFlag && <Image src={iconFlag} width={'33'} height={'33'} alt={'Flag'} />}
      </CustomImageWrapper>
      <CustomImageWrapper className={styles.settings}>
        {size === 'large' && <Image src={iconSettings} width={'30'} height={'30'} alt={'Settings'} />}
      </CustomImageWrapper>
    </div>
  );
};

export default CardStudentForTeacher;
