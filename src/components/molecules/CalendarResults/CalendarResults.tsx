import React, { FC } from 'react';

import CustomCalendar from '@components/calendar/CustomCalendar';
import calendar from '@svgs/calendar_grey.svg';

import styles from './CalendarResults.module.scss';

type Props = {
  value: string;
  onChange: () => void;
  placeholder?: string;
};

const CalendarResults: FC<Props> = props => {
  const { placeholder } = props;
  return (
    <div className={styles.calendar}>
      <input type='text' className={styles.input} placeholder={placeholder} />
      <CustomCalendar
        setTitle={str => console.log(str)}
        icon={calendar}
        iconParams={{ width: 16, height: 16 }}
        dataAuto='calendar'
      />
    </div>
  );
};

CalendarResults.defaultProps = {
  placeholder: '',
};

export default CalendarResults;
