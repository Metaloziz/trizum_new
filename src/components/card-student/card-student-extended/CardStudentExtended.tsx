import React, { FC, useState } from 'react';

import modals from '../../../app/stores/CardStudentExtended';

import styles from './CardStudentExtended.module.scss';

import { RoleNames, Roles } from 'app/stores/appStore';
import { ResponseOneUser, ResponseUserT } from 'app/types/UserTypes';
import Button from 'components/button/Button';
import { EditUserIcon } from 'components/card-student/card-student-extended/edit-user-icon/EditUserIcon';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import mockAvatar from 'public/img/avatarDefault.png';

type Props = {
  user: ResponseUserT;
  onEditUserClick: (id: string) => void;
  getOneUser: (id: string) => Promise<ResponseOneUser | undefined>;
};

const CardStudentExtended: FC<Props> = ({
  user: {
    email,
    phone,
    id,
    firstName,
    lastName,
    middleName,
    city,
    avatar,
    groups,
    status,
    roleCode,
    franchise,
  },
  getOneUser,
  // onEditUserClick,
}) => {
  const [isShow, setShow] = useState<boolean>(false);

  const name = `${middleName ?? ''} ${firstName ?? ''} ${lastName ?? ''}`.trim();

  let role;

  switch (roleCode) {
    case Roles.Student:
      role = RoleNames.student;
      break;
    case Roles.Parent:
      role = RoleNames.parent;
      break;
    case Roles.Teacher:
      role = RoleNames.teacher;
      break;
    case Roles.TeacherEducation:
      role = RoleNames.teacherEducation;
      break;
    case Roles.Tutor:
      role = RoleNames.tutor;
      break;
    case Roles.Methodist:
      role = RoleNames.methodist;
      break;
    case Roles.Admin:
      role = RoleNames.admin;
      break;
    case Roles.FranchiseeAdmin:
      role = RoleNames.franchiseeAdmin;
      break;
    case Roles.Franchisee:
      role = RoleNames.franchisee;
      break;
    default:
      role = '-';
  }

  const onEditUserClick = async () => {
    try {
      const responce = await getOneUser(id);
      modals.changeSetting();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowWrapper}>
        <div className={styles.row}>
          <CustomImageWrapper className={styles.image} variant="circle">
            <Image src={avatar ? avatar.path : mockAvatar} width="170" height="170" alt="avatar" />
          </CustomImageWrapper>
          <div className={styles.title}>
            <h3>{name}</h3>
            <div className={styles.mt20}>
              <p className={styles.list}>
                Статус: <span>{role}</span>
              </p>
              {city && (
                <p className={styles.list}>
                  Город: <span>{city}</span>
                </p>
              )}
              {phone && roleCode !== Roles.Student && (
                <p className={styles.list}>
                  Телефон: <span>{phone}</span>
                </p>
              )}
              {email && roleCode !== Roles.Student && (
                <p className={styles.list}>
                  Почта: <span>{email}</span>
                </p>
              )}
              {!!groups.length && roleCode === Roles.Student && (
                <p className={styles.list}>
                  Группа: <span>{groups[0].groupCode}</span>
                </p>
              )}
              {franchise && roleCode === Roles.Student && (
                <p className={styles.list}>
                  Группа: <span>{franchise.shortName}</span>
                </p>
              )}
              {/* <p className={styles.list}> */}
              {/*  Дата рождения: <span>{birthdate && birthdate.date}</span> */}
              {/* </p> */}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          {roleCode === Roles.Student && (
            <Button variant="parents" size="small" onClick={() => modals.changeParents()}>
              Родители
            </Button>
          )}
        </div>
      </div>
      <EditUserIcon
        onClick={onEditUserClick}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        show={isShow}
      />
    </div>
  );
};

export default CardStudentExtended;
