import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useState, FC } from 'react';
import Calendar from 'react-calendar';
import calendar from '@app/stores/Calendar';
import calendarImage from '@svgs/calendar-pic.svg';
import styles from './CustomCalendar.module.scss';
import 'react-calendar/dist/Calendar.css';

interface Props {
  setTitle: (value: string) => void;
  icon?: string;
  iconParams?: { width: number; height: number };
}

const CustomCalendar: FC<Props> = observer(({ setTitle, icon, iconParams }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const showCalendarHandler = () => {
    if (calendar.isShow == showCalendar) {
      setShowCalendar(true);
      calendar.isOpen();
    }
  };
  const changeDate = (date: Date) => {
    const title = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    setDate(date);
    setTitle(title);
    setShowCalendar(false);
    calendar.isClose();
  };
  const params = iconParams || { width: 30, height: 30 };
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarImage} onClick={showCalendarHandler}>
        <Image src={icon || calendarImage} alt="calendar" {...params} />
        <div className={styles.blockCalendar}>
          {showCalendar && (
            <Calendar
              className={styles.myCalendar}
              tileClassName={styles.titleCalendar}
              onChange={changeDate}
              value={date}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default CustomCalendar;
