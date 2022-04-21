import React, { useState } from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import CardStudent from '@components/card-student/CardStudent';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import StudentPageFranchiseeModalAddUser from '@components/page-franchisee-administrator-main/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser';
import StudentPageFranchiseeModalParents from '@components/page-franchisee-administrator-main/student-page-franchisee-modal-parents/StudentPageFranchiseeModalParents';
import styles from './StudentPageFranchisee.module.scss';

const StudentPageFranchisee = () => {
  const [isModalAddUser, setModalAddUser] = useState<boolean>(false);
  const [isModalParents, setModalParents] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <div className={styles.column}>
          <InformationItem variant={'calendar'} title={'Дата'} />
          <InformationItem variant={'select'} title={'Выполнил Д/З'} />
          <InformationItem variant={'select'} title={'Город'} />
          <InformationItem variant={'select'} title={'Группа'} />
        </div>
        <div className={styles.column}>
          <InformationItem variant={'select'} title={'Оплачен'} />
          <InformationItem variant={'select'} title={'Роль'} />
          <InformationItem variant={'select'} title={'Статус'} />
          <InformationItem variant={'select'} title={'Юр.лицо'} />
        </div>
        <div className={`${styles.column} ${styles.flexColumn}`}>
          <div>
            <InformationItem variant={'calendar'} title={'Дата рождения'} />
            <InformationItem variant={'input'} title={'ФИО'} />
          </div>
          <div className={styles.buttons}>
            <CustomButton size={'small'}>Найти</CustomButton>
            <CustomButton
              type={'addUser'}
              size={'small'}
              onClick={() => setModalAddUser(true)}
            >
              Добавить пользователя
            </CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.cardWrapper}>
        <CardStudent
          type={'extended'}
          title={'Днепровский Александр Алексеевич'}
        />
      </div>
      <BasicModal
        visibility={isModalParents}
        changeVisibility={setModalParents}
      >
        <StudentPageFranchiseeModalParents />
      </BasicModal>
      <BasicModal
        visibility={isModalAddUser}
        changeVisibility={setModalAddUser}
      >
        <StudentPageFranchiseeModalAddUser />
      </BasicModal>
    </div>
  );
};

export default StudentPageFranchisee;
