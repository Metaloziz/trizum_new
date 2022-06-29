import React, { FC, useState } from 'react';

import { ResponseUserT } from '@app/services/usersService';
import { UserT } from '@app/types/UserTypes';
import ButtonOpenClose from '@components/button-open-close/ButtonOpenClose';
import CardStudentButtonGroup from '@components/card-student/card-student-for-teacher/card-student-button-group/CardStudentButtonGroup';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import CustomButton from '@components/custom-button/CustomButton';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import mockAvatar from '@public/img/pervoklasnin.jpg';
import iconSettingsBlue from '@svgs/icon-setting-blue.svg';
import iconSettings from '@svgs/icon-settings.svg';
import Image from 'next/image';

import modals from '../../../app/stores/CardStudentExtended';

import styles from './CardStudentExtended.module.scss';

type Props = {
  user: ResponseUserT;
};

const CardStudentExtended: FC<Props> = props => {
  const {
    user: { email, roleCode, phone, id },
  } = props;
  // const name = `${middleName} ${firstName} ${lastName}`;
  const [isShow, setShow] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.rowWrapper}>
        <div className={styles.row}>
          <CustomImageWrapper className={styles.image} variant="circle">
            <Image src={mockAvatar} width="170" height="170" alt="avatar" />
            {/* <Image src={avatar ? avatar.path : mockAvatar} width="170" height="170" alt="avatar" /> */}
          </CustomImageWrapper>
          <div className={styles.title}>
            <h3>{roleCode}</h3>
            {/* <h3>{name}</h3> */}
            <div className={styles.mt20}>
              <p className={styles.list}>
                Статус: <span>{roleCode}</span>
              </p>
              {/* <p className={styles.list}> */}
              {/*  Город: <span>{city}</span> */}
              {/* </p> */}
              <p className={styles.list}>
                Телефон: <span>{phone}</span>
              </p>
              <p className={styles.list}>
                Почта: <span>{email}</span>
              </p>
              {/* <p className={styles.list}> */}
              {/*  Дата рождения: <span>{birthdate && birthdate.date}</span> */}
              {/* </p> */}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          {roleCode === 'admin' && (
            <CustomButton type='parents' size='small' onClick={() => modals.changeParents()}>
              Родители
            </CustomButton>
          )}
          <ButtonOpenClose isOpen={false} />
        </div>
      </div>
      <div
        className={styles.settings}
        onClick={() => modals.changeSetting()}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        {isShow ? (
          <Image src={iconSettingsBlue} width="30" height="30" alt="Settings" />
        ) : (
          <Image src={iconSettings} width="30" height="30" alt="Settings" />
        )}
      </div>
    </div>
  );
};

export default CardStudentExtended;
