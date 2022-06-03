import React, { FC, useState } from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import { ScheduleEvent } from '@components/schedule/ScheduleDnD';
import TextField from '@components/text-fild/TextFild';
import styles from './ScheduleModal.module.scss';

type ScheduleModalProps = {
  event: ScheduleEvent;
  onApply: (event: ScheduleEvent) => void;
};

const ScheduleModal: FC<ScheduleModalProps> = (props) => {
  const { event, onApply } = props;
  const [title, setTitle] = useState(event.title);
  const [cl, setClass] = useState(event.class);
  const [lesson, setLesson] = useState(event.lesson);
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
  return (
    <div className={styles.wrapper}>
      <TextField value={title} onChange={setTitle} />
      <TextField value={lesson} onChange={setLesson} />
      <TextField value={cl} onChange={setClass} />
      <CustomButton size={'small'} onClick={applyChanges}>
        Применить
      </CustomButton>
    </div>
  );
};

export default ScheduleModal;
