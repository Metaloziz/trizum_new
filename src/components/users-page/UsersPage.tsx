import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import CardStudent from '@components/card-student/CardStudent';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import StudentPageFranchiseeModalAddUser from '@components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser';
import StudentPageFranchiseeModalParents from '@components/users-page/student-page-franchisee-modal-parents/StudentPageFranchiseeModalParents';
import StudentPageFranchiseeModalSetting from '@components/users-page/student-page-franchisee-modal-setting/StudentPageFranchiseeModalSetting';
import styles from './UsersPage.module.scss';
import modals from '../../app/stores/CardStudentExtended';

const UsersPage = observer(() => {
  const [isModalAddUser, setModalAddUser] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <div className={styles.column}>
          <InformationItem
            variant={'calendar'}
            title={'Дата'}
            dataAuto={'date'}
          />
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
        <div className={cn(styles.column, styles.flexColumn)}>
          <div>
            <InformationItem
              variant={'calendar'}
              title={'Дата рождения'}
              dataAuto={'birthDate'}
            />
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
        visibility={modals.isParents}
        changeVisibility={() => modals.changeParents()}
      >
        <StudentPageFranchiseeModalParents />
      </BasicModal>
      <BasicModal
        visibility={isModalAddUser}
        changeVisibility={setModalAddUser}
      >
        <StudentPageFranchiseeModalAddUser />
      </BasicModal>
      <BasicModal
        visibility={modals.isSetting}
        changeVisibility={() => modals.changeSetting()}
      >
        <StudentPageFranchiseeModalSetting />
      </BasicModal>
    </div>
  );
});

export default UsersPage;
