import React, { FC, useState } from 'react';

import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import { ScheduleEvent } from '@components/schedule/ScheduleDnD';
import moment from 'moment';

import styles from './ScheduleModal.module.scss';

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
    <div className={styles.wrapper}>
      <h4>Редактирование урока</h4>
      <InformationItem
        title='Время начала урока'
        variant='calendar'
        value={start}
        onChange={handleStartChange}
      />
      <InformationItem
        title='Время окончания урока'
        variant='calendar'
        value={end}
        onChange={handleEndChange}
      />
      <InformationItem title='Учитель' variant='input' />
      <InformationItem title='Статус' variant='input' />
      {/* <TextField value={cl} onChange={setClass} label={'Учитель'} /> */}
      {/* <TextField value={cl} onChange={setClass} label={'Статус'} /> */}
      <CustomButton onClick={applyChanges}>Сохранить</CustomButton>
    </div>
  );
};

export default ScheduleModal;
