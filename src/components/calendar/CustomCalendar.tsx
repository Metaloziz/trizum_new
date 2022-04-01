import Image from 'next/image';
import React, { useState, MouseEvent, ChangeEvent } from 'react';
import Calendar from 'react-calendar';
import calendarImage from '@svgs/calendar-pic.svg';
import styles from './CustomCalendar.module.scss';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarImage} onClick={() => setShowCalendar(!showCalendar)}>
        <Image src={calendarImage} alt='calendar' width={30} height={30} />
        <div className={styles.blockCalendar}>
          {showCalendar && (
            <Calendar
              className={styles.myCalendar}
              // tileClassName={styles.titleCalendar}
              value={value}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
