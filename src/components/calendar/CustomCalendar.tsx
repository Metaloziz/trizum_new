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
}

const CustomCalendar: FC<Props> = observer(({ setTitle }) => {
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

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarImage} onClick={showCalendarHandler}>
        <Image src={calendarImage} alt="calendar" width={30} height={30} />
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
