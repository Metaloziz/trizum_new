import classNames from 'classnames';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import CardStudentButtonGroup from '@components/card-student/card-student-button-group/CardStudentButtonGroup';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import StudentInfoTable from '@components/card-student/student-info-table/StudentInfoTable';
import StudentInfo from '@components/card-student/student-info/StudentInfo';
import CustomButton from '@components/custom-button/CustomButton';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import avatar from '@public/img/pervoklasnin.jpg';
import iconFlag from '@svgs/flag.svg';
import iconSettings from '@svgs/icon-settings.svg';
import styles from './CardStudent.module.scss';

type UserType = 'student' | 'teacher';

type SizeType = 'large' | 'normal';

interface Props {
  title: string;
  user: UserType;
  flag?: boolean;
  size?: SizeType;
  settings?: boolean;
  className?: string;
  // Добавил костыль, так как компонент явно нужно переписывать. Невозможно использовать. Помогу позже, или перепишу сам
  isExtended?: boolean;
}

const CardStudent: FC<Props> = ({
  className,
  title,
  user,
  flag = false,
  size = 'normal',
  settings = false,
  isExtended = true,
}) => {
  const [showFlag] = useState<boolean>(flag);
  const [showSettings] = useState<boolean>(settings);

  const sizeStyle = size === 'large' ? styles.larg : '';
  const finalStyle = `${styles.wrapper} ${sizeStyle}`;

  return (
    <div className={classNames(finalStyle, className)}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.student} variant={'circle'}>
          <Image src={avatar} width={'170'} height={'170'} alt={'student'} />
        </CustomImageWrapper>
        <div>
          <CardStudentTitle>{title}</CardStudentTitle>
          <div className={styles.studentInfoTableWrapper}>
            {user === 'teacher' && <StudentInfoTable />}
            {user === 'student' && <StudentInfo />}
          </div>
        </div>
        {isExtended && (
          <div className={styles.CardStudentButtonInfoGroup}>
            <CustomButton>Родители</CustomButton>
            <CustomButton>Разблокировать</CustomButton>
          </div>
        )}
        <CustomImageWrapper className={styles.flag} variant={'none'}>
          {showFlag && (
            <Image src={iconFlag} width={'33'} height={'33'} alt={'Flag'} />
          )}
        </CustomImageWrapper>
        <CustomImageWrapper className={styles.settings}>
          {showSettings && (
            <Image
              src={iconSettings}
              width={'33'}
              height={'33'}
              alt={'Settings'}
            />
          )}
        </CustomImageWrapper>
      </div>
      {user === 'student' && <CardStudentButtonGroup />}
    </div>
  );
};

export default CardStudent;
