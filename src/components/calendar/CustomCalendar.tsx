import { useState, FC } from 'react';

import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Calendar from 'react-calendar';

import styles from './CustomCalendar.module.scss';

import calendar from 'app/stores/Calendar';
import calendarImage from 'assets/svgs/calendar-pic.svg';
import Image from 'components/image/Image';
import useComponentVisible from 'HOC/drop-down-hook/DropDownHook';
import 'react-calendar/dist/Calendar.css';

interface Props {
  setTitle: (value: string) => void;
  dataAuto: string;
  icon?: string;
  iconParams?: { width: number; height: number };
}

const CustomCalendar: FC<Props> = ({ setTitle, icon, iconParams, dataAuto }) => {
  const [date, setDate] = useState(new Date());
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false, dataAuto);
  const changeDate = (date1: Date) => {
    const title = `${date1.getDate()}.${date1.getMonth() + 1}.${date1.getFullYear()}`;
    setDate(date1);
    setTitle(title === '' ? '' : moment(title, 'D.M.YYYY').format('DD.MM.YYYY'));
    setIsComponentVisible(false);
    calendar.setShow(false);
  };
  const onClick = () => {
    setIsComponentVisible(!isComponentVisible);
    calendar.setShow(!isComponentVisible);
  };
  const params = iconParams || { width: 30, height: 30 };
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarImage}>
        <Image
          src={calendarImage}
          alt="calendar"
          width={30}
          height={30}
          onClick={onClick}
          data-auto={dataAuto}
        />
        <div className={styles.blockCalendar} ref={ref}>
          {calendar.isShow && isComponentVisible && (
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
};

export default CustomCalendar;
