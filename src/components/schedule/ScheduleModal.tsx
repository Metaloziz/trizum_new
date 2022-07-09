import React, { FC, useState } from 'react';

import moment from 'moment';

import styles from './ScheduleModal.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import { ScheduleEvent } from 'components/schedule/ScheduleDnD';

type ScheduleModalProps = {
  event: ScheduleEvent;
  onApply: (event: ScheduleEvent) => void;
};

const ScheduleModal: FC<ScheduleModalProps> = props => {
  const { event, onApply } = props;
  const [title, setTitle] = useState(event.title);

  const [cl, setClass] = useState(event.class);
  const [lesson, setLesson] = useState(event.lesson);

  const [start, setStart] = useState(moment(event.start, 'D.M.YYYY').format('DD.MM.YYYY'));
  const [end, setEnd] = useState(moment(event.end, 'D.M.YYYY').format('DD.MM.YYYY'));
  const applyChanges = () => {
    const newEvent: ScheduleEvent = {
      title,
      lesson,
      class: cl,
      id: event.id,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    onApply(newEvent);
  };
  const handleStartChange = (date: string) => {
    setStart(date);
  };
  const handleEndChange = (date: string) => {
    setEnd(date);
  };
  return (
    <div className={styles.wrapperModal}>
      <h4>Редактирование урока</h4>
      <div className={styles.lesson}>
        <div className={styles.dateLesson}>
          <p>Дата урока</p>
          <InformationItem
            variant="calendar"
            className={styles.calendarLesson}
            placeholder="21/03/2021"
          />
        </div>
        <div className={styles.choiceTime}>
          <div className={styles.startLesson}>
            <p>Начало урока</p>
            <InformationItem variant="input" className={styles.startInput} placeholder="14:00" />
          </div>
          <div className={styles.endLesson}>
            <p>Конец урока</p>
            <InformationItem variant="input" className={styles.endInput} placeholder="14:00" />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <div className={styles.saveSelect}>
          <p>Статус</p>
          <InformationItem variant="select" placeholder="Активен" className={styles.activeSelect} />
        </div>
        <Button onClick={applyChanges}>Редактировать группу</Button>
        <Button onClick={applyChanges}>Сохранить</Button>
      </div>
      {/* <InformationItem */}
      {/*  title='Дата урока' */}
      {/*  variant='calendar' */}
      {/*  value={start} */}
      {/*  onChange={handleStartChange} */}
      {/* /> */}
      {/* <InformationItem */}
      {/*  title='Начало урока' */}
      {/*  variant='calendar' */}
      {/*  value={end} */}
      {/*  onChange={handleEndChange} */}
      {/* /> */}
      {/* <InformationItem */}
      {/*  title='Конец урока' */}
      {/*  variant='calendar' */}
      {/*  value={end} */}
      {/*  onChange={handleEndChange} */}
      {/* /> */}
      {/* <InformationItem title='Учитель' variant='input' /> */}
      {/* <InformationItem title='Статус' variant='input' /> */}
      {/* <TextField value={cl} onChange={setClass} label={'Учитель'} /> */}
      {/* <TextField value={cl} onChange={setClass} label={'Статус'} /> */}
    </div>
  );
};

export default ScheduleModal;
