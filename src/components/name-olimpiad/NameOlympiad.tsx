import React, { useState } from 'react';

import styles from './NameOliypiad.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import TextEditor from 'components/text-editor/TextEditor';

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
        <div className={styles.modalOlympiad}>
          <h2>Добавление олипиады</h2>
          <div className={styles.modalName}>
            <p>Название олимпиады</p>
            <InformationItem className={styles.modalInput} variant="input" />
          </div>
          <div className={styles.modalChoice}>
            <div className={styles.modalCalendar}>
              <p>Дата и время начала</p>
              <InformationItem className={styles.calendar} variant="calendar" />
            </div>
            <div className={styles.modalCalendar}>
              <p>Дата и время окончания</p>
              <InformationItem className={styles.calendar} variant="calendar" />
            </div>
          </div>
          <div className={styles.modalEditor}>
            <p>Описание олимпиады</p>
            <div className={styles.editor}>
              <TextEditor />
            </div>
          </div>
          <div className={styles.modalSelect}>
            <div>
              <div className={styles.selectBlock}>
                <p>Город</p>
                <InformationItem className={styles.select} variant="select" />
              </div>
              <div className={styles.selectBlock}>
                <p>Адрес школы</p>
                <InformationItem className={styles.select} variant="select" />
              </div>
            </div>
            <div>
              <div className={styles.selectBlock}>
                <p>Группа</p>
                <InformationItem className={styles.select} variant="select" />
              </div>
              <div className={styles.selectBlock}>
                <p>Тип группы</p>
                <InformationItem className={styles.select} variant="select" />
              </div>
            </div>
          </div>
          <div className={styles.saveBtn}>
            <Button>Сохранить</Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default NameOlympiad;
