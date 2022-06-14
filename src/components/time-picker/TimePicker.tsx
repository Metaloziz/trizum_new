import React, { FC, Ref, useEffect, useRef, useState } from 'react';

import TextField from '@components/text-field/TextField';
import TimePickerSelect from '@components/time-picker/TimePickerSelect';
import time from '@svgs/calendar_grey.svg';
import moment from 'moment';
import Image from 'next/image';

import styles from './TimePicker.module.scss';

type Props = {
  date?: Date;
};
const MIN_TIME_LENGTH = 10;
const START_HOUR = 8;
const START_MIN = 0;
const END_HOUR = 20;
const END_MIN = 60;
const STEP_MINUTES = 15;
const HOURS: string[] = [];
const MINUTES: string[] = [];
for (let i = START_HOUR; i < END_HOUR; i++) {
  const str = i < MIN_TIME_LENGTH ? `0${i}` : i.toString();
  HOURS.push(str);
}
for (let i = START_MIN; i < END_MIN; i += STEP_MINUTES) {
  const str = i < MIN_TIME_LENGTH ? `0${i}` : i.toString();
  MINUTES.push(str);
}

const TimePicker: FC<Props> = props => {
  const { date } = props;
  const [isOpen, setIsOpen] = useState(false);
  const actualDate = date ? moment(date).format('HH:MM') : '';
  const [value, setValue] = useState(
    date ? actualDate : `${START_HOUR.toString()}:${START_MIN.toString()}`,
  );
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLButtonElement>(null);
  const onOpenSelect = (): void => {
    setIsOpen(true);
  };
  const onSelectDate = (v: string): void => {
    console.log(v);
  };
  const onBlur = (e: Event): void => {
    if (imgRef.current && imgRef.current.contains(e.target as Node)) {
      setIsOpen(true);
      return;
    }
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', onBlur);
    // console.log(ref, 'ref');
    return () => document.removeEventListener('click', onBlur);
  });
  return (
    <div className={styles.container}>
      <TextField value={value} />
      <button type="button" onClick={onOpenSelect} ref={imgRef}>
        asd
      </button>
      {/* <Image src={time} className={styles.icon} onClick={onOpenSelect} /> */}
      {isOpen && (
        <TimePickerSelect minutes={MINUTES} hours={HOURS} onSelect={onSelectDate} ref={ref} />
      )}
    </div>
  );
};

TimePicker.defaultProps = {
  date: undefined,
};

export default TimePicker;
