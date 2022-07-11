import { ChangeEvent, FC, useState, useRef, LegacyRef, forwardRef } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './TextFieldCalendar.module.scss';

import calendarImage from 'assets/svgs/calendar-pic.svg';
import Image from 'components/image/Image';

interface Props {
  dataAuto: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
}

const ExampleCustomInput = forwardRef<HTMLInputElement>(({ value, onClick }: any, ref) => (
  <input className={styles.input} type="text" onClick={onClick} value={value} ref={ref} />
));

const TextFieldCalendar = (props: Props) => {
  const { dataAuto, onChange, value, label } = props;

  const [startDate, setStartDate] = useState(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const datepickerRef = useRef<any>(null); // OR React.createRef();  if you are not using hooks

  // OPENS UP THE DATEPICKER WHEN THE CALENDAR ICON IS CLICKED FOR THE INPUT FIELD
  const handleClickDatepickerIcon = () => {
    const datepickerElement = datepickerRef.current;
    // console.log("datepickerElement = ", datepickerElement);
    // debugger
    datepickerElement && datepickerElement?.handleFocus(true);
  };

  return (
    <div className={styles.textFieldCalendar}>
      {label && <p>{label}</p>}
      <div className={styles.inputCalendar}>
        <DatePicker
          selected={startDate}
          onChange={date => handleChangeDate(date)}
          customInput={<ExampleCustomInput />}
          ref={datepickerRef}
          dateFormat="dd.MM.yyyy"
        />
      </div>
      <div>
        <Image
          src={calendarImage}
          alt="calendar"
          width={30}
          height={30}
          onClick={handleClickDatepickerIcon}
        />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
