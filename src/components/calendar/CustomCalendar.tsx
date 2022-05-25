import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Image from 'next/image';
import { useState, FC } from 'react';
import Calendar from 'react-calendar';
import calendar from '@app/stores/Calendar';
import useComponentVisible from '@HOC/drop-down-hook/DropDownHook';
import calendarImage from '@svgs/calendar-pic.svg';
import styles from './CustomCalendar.module.scss';
import 'react-calendar/dist/Calendar.css';

interface Props {
  setTitle: (value: string) => void;
  dataAuto: string;
  icon?: string;
  iconParams?: { width: number; height: number };
}

const CustomCalendar: FC<Props> = observer(({ setTitle, icon, iconParams, dataAuto }) => {
  const [date, setDate] = useState(new Date());
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, dataAuto);
  const changeDate = (date: Date) => {
    const title = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    setDate(date);
    setTitle(title == '' ? '' : moment(title, 'D.M.YYYY').format('DD.MM.YYYY'));
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
          alt={'calendar'}
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
});

export default CustomCalendar;
