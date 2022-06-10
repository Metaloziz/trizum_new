import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import InformationItem from '@components/information-item/InformationItem';
import user from '@public/svgs/user.svg';
import iconMedal from '@svgs/medal.svg';
import styles from './StudentParents.module.scss';

const StudentParents = () => {
  const [currentRadioValue, setCurrentRadioValue] = useState('inputChoice1');
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };
  return (
    <div className={styles.row}>
      <CustomImageWrapper variant={'circle'}>
        <div className={styles.imageWrapper}>
          <Image src={user} width={'130'} height={'140'} alt={'user'} />
        </div>
      </CustomImageWrapper>
      <div className={styles.table}>
        <div className={styles.infoItem}>
          <span>ФИО:</span>
          <InformationItem title={''} variant={'input'} />
        </div>
        <div className={styles.selectWrapper}>
          <div className={styles.selectWidth}>
            <InformationItem variant={'select'} title={'Роль:'} />
          </div>
        </div>
        <div className={styles.infoItem}>
          <span>Город:</span>
          <InformationItem title={''} variant={'input'} />
        </div>
        <div className={styles.infoItem}>
          <span>Телефон:</span>
          <InformationItem title={''} variant={'input'} />
        </div>
        <div className={styles.infoItem}>
          <span>Дата рождения:</span>
          <InformationItem title={''} variant={'input'} />
        </div>
        <div className={styles.infoItem}>
          <span>Почта:</span>
          <InformationItem title={''} variant={'input'} />
        </div>
        <div className={styles.selectWrapper}>
          <div className={styles.selectWidth}>
            <InformationItem variant={'select'} title={'Пол:'} />
          </div>
          <div className={styles.label}>
            <label>
              <input
                type={'radio'}
                value={'inputChoice1'}
                id={'inputChoice1'}
                name={'currentRadioValue'}
                onChange={handlerRadioChange}
                checked={currentRadioValue === 'inputChoice1'}
              />
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
