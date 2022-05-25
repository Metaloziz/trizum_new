import { FC, useState } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';
import styles from './TextFieldCalendar.module.scss';

interface Props {
  dataAuto: string;
}

const TextFieldCalendar: FC<Props> = ({ dataAuto }) => {
  const [title, setTitle] = useState<string>('');
  return (
    <div className={styles.textFieldCalendar}>
      <div>
        <input type={'text'} value={title} />
      </div>
      <div>
        <CustomCalendar setTitle={setTitle} dataAuto={dataAuto} />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
