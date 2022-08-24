import React, { useState } from 'react';

import styles from './NameOliypiad.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import { OlympiadForm } from 'components/olympiad-page/components/OlympiadForm/OlympiadForm';

const NameOlympiad = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.containerOlympiad}>
      <div className={styles.choiceStart}>
        <div className={styles.nameOlympiad}>
          <p>Название</p>
          <InformationItem className={styles.infoInput} variant="input" />
        </div>
        <div className={styles.calendarOlympiad}>
          <p>Дата начала</p>
          <InformationItem className={styles.infoCalendar} variant="calendar" />
        </div>
        <div className={styles.calendarOlympiad}>
          <p>Дата окончания</p>
          <InformationItem className={styles.infoCalendar} variant="calendar" />
        </div>
      </div>
      <div className={styles.choiceGroup}>
        <div className={styles.groupOlympiad}>
          <p>Группа</p>
          <InformationItem variant="select" />
        </div>
        <div className={styles.groupOlympiad}>
          <p>Тип группы</p>
          <InformationItem variant="select" />
        </div>
      </div>
      <div className={styles.choicePlace}>
        <div className={styles.cityOlympiad}>
          <p>Город</p>
          <InformationItem className={styles.infoInput} variant="input" />
        </div>
        <div className={styles.cityOlympiad}>
          <p>Адрес</p>
          <InformationItem className={styles.infoInput} variant="input" />
        </div>
      </div>
      <div className={styles.btnOlympiad}>
        <div className={styles.addOlympiad}>
          <Button onClick={() => setShowModal(true)}>Добавить</Button>
        </div>
        <Button>Найти</Button>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadForm setShowModal={setShowModal} />
      </BasicModal>
    </div>
  );
};

export default NameOlympiad;
