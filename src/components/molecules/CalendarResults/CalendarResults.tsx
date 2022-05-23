import React, { FC } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';
import calendar from '@svgs/calendar_grey.svg';
import styles from './CalendarResults.module.scss';

type Props = {
  value: string;
  onChange: () => void;
};

const CalendarResults: FC<Props> = (props) => {
  const {} = props;
  return (
    <div className={styles.calendar}>
      <input type="text" className={styles.input}/>
      <CustomCalendar
        setTitle={(str) => console.log(str)}
        icon={calendar}
        iconParams={{ width: 16, height: 16 }}
      />
    </div>
  );
};

export default CalendarResults;
