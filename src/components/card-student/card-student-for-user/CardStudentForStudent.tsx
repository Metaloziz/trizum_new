import React, { FC, useState } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import iconTablet from '../../../assets/svgs/icon-tablet.svg';
import iconParrot from '../../../assets/svgs/parrot.svg';

import styles from './CardStudentForUser.module.scss';
import { getNearestLessonDateHelper } from './getNearestLessonDateHelper/getNearestLessonDateHelper';

import {EmptyUser, Roles} from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { ResponseLoadMeBaseT } from 'app/types/ResponseLoadMeBaseT';
import iconFlag from 'assets/svgs/icon-flag.svg';
import iconMonkey from 'assets/svgs/monkey.svg';
import iconTelegram from 'assets/svgs/telegram.svg';
import iconWhatsApp from 'assets/svgs/whats-app.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import { getAvatarImage } from 'components/card-student/card-student-for-user/helper/getAvatarImage';
import { OlympiadPreviewText } from 'components/card-student/card-student-for-user/OlympiadPreviewText/OlympiadPreviewText';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import Setting from 'components/setting/Setting';

type Props = {
  user: EmptyUser;
};

const CardStudentForStudent: FC<Props> = observer(({ user }) => {
  const { firstName, middleName, lastName, role, avatar, city, groups } = user;
  const { getFullUserName } = usersStore;

  const nearestLessonDate = getNearestLessonDateHelper(groups);

  const [showModal, setShowModal] = useState<boolean>(false);

  const fullName = `${firstName} ${middleName} ${lastName}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image src={getAvatarImage(avatar?.path)} width="170" height="170" alt="student" />
          <div className={styles.userSetting}>
            <Setting />
          </div>
        </CustomImageWrapper>
        <div>
          <h3 className={styles.title}>{fullName}</h3>
          <div className={styles.mt15}>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconMonkey} width="25" height="25" alt="icon monkey" />
                </span>
                Статус:
              </li>
              <li>{role === Roles.Student && 'Студент'}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconFlag} width="25" height="25" alt="flag" />
                </span>
                Город:
              </li>
              <li>{city}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconParrot} width="25" height="25" alt="parrot" />
                </span>
                Учитель:
              </li>
              <li>{getFullUserName}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width="25" height="25" alt="icon tablet" />
                </span>
                Следующее занятие:
              </li>
              <li>{nearestLessonDate}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cn(styles.row, styles.buttonGroup)}>
        <div className={styles.social}>
          <span>Ссылки на чаты:</span>
          <Image src={iconTelegram} width="25" height="25" alt="icon tablet" />
          <Image src={iconWhatsApp} width="25" height="25" alt="icon tablet" />
        </div>
        <Button size="small" onClick={() => setShowModal(true)}>
          Принять участие в олимпиаде
        </Button>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadPreviewText />
      </BasicModal>
    </div>
  );
});

export default CardStudentForStudent;
