import Image from 'next/image';
import React from 'react';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import InformationItem from '@components/information-item/InformationItem';
import avatar from '@public/img/pervoklasnin.jpg';
import styles from './StudentInformation.module.scss';

const StudentInformation = () => {
  return (
    <div className={styles.row}>
      <CustomImageWrapper variant={'circle'}>
        <Image src={avatar} width={'290'} height={'290'} alt={'student'} />
      </CustomImageWrapper>
      <div className={styles.table}>
        <div className={styles.table}>
          <div className={styles.infoItem}>
            <span>ФИО:</span>
            <input type="text" />
          </div>
          <div className={styles.selectWrapper}>
            <div className={styles.selectWidth}>
              <InformationItem variant={'select'} title={'Роль:'} />
            </div>
          </div>
          <div className={styles.infoItem}>
            <span>Город::</span>
            <input type="text" />
          </div>
          <div className={styles.infoItem}>
            <span>Город:</span>
            <input type="text" />
          </div>
          <div className={styles.infoItem}>
            <span>Дата рождения:</span>
            <input type="text" />
          </div>
          <div className={styles.infoItem}>
            <span>Почта:</span>
            <input type="text" />
          </div>
          <div className={styles.selectWrapper}>
            <div className={styles.selectWidth}>
              <InformationItem variant={'select'} title={'Пол:'} />
            </div>
          </div>
          <div className={styles.selectWrapper}>
            <div className={styles.selectWidth}>
              <InformationItem variant={'select'} title={'Учитель:'} />
            </div>
          </div>
          <div className={styles.selectWrapper}>
            <div className={styles.selectWidth}>
              <InformationItem variant={'select'} title={'Группа:'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;