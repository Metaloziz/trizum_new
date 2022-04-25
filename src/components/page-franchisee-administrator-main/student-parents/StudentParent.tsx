import Image from 'next/image';
import React from 'react';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import InformationItem from '@components/information-item/InformationItem';
import avatar from '@public/img/pervoklasnin.jpg';
import iconMedal from '@svgs/medal.svg';
import styles from './StudentParents.module.scss';

const StudentParents = () => {
  return (
    <div className={styles.row}>
      <CustomImageWrapper variant={'circle'}>
        <div className={styles.imageWrapper}>
          <Image src={avatar} width={'290'} height={'290'} alt={'student'} />
        </div>
      </CustomImageWrapper>
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
          <span>Город:</span>
          <input type="text" />
        </div>
        <div className={styles.infoItem}>
          <span>Телефон:</span>
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
          <div className={styles.label}>
            <label>
              <input type="radio" />
              Основной
            </label>
            <div className={styles.medal}>
              <Image src={iconMedal} width={'20'} height={'20'} alt={'medal'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentParents;
