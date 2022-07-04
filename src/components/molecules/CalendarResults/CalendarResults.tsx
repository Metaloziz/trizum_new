import React, { FC } from 'react';

import styles from './CalendarResults.module.scss';

import calendar from 'assets/svgs/calendar_grey.svg';
import CustomCalendar from 'components/calendar/CustomCalendar';

type Props = {
  value?: string;
  onChange?: () => void;
};

const CalendarResults: FC<Props> = props => (
  <div className={styles.calendar}>
    <input type="text" className={styles.input} />
    <CustomCalendar
      setTitle={str => console.log(str)}
      dataAuto=""
      icon={calendar}
      iconParams={{ width: 16, height: 16 }}
    />
  </div>
);

export default CalendarResults;
