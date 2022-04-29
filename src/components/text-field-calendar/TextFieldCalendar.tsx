import { useState } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';
import styles from './TextFieldCalendar.module.scss';

const TextFieldCalendar = () => {
  const [title, setTitle] = useState<string>('');
  return (
    <div className={styles.textFieldCalendar}>
      <div>
        <input
          type={'text'}
          value={title}
          onChange={() => {
            console.log('change');
          }}
        />
      </div>
      <div>
        <CustomCalendar setTitle={setTitle} />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
