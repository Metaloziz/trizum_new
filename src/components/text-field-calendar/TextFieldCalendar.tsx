import { ChangeEvent, FC, useState } from 'react';

import CustomCalendar from '@components/calendar/CustomCalendar';
import closeCalendar from '@svgs/button.svg';
import Image from 'next/image';

import styles from './TextFieldCalendar.module.scss';

interface Props {
  dataAuto: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const TextFieldCalendar = (props: Props) => {
  const { dataAuto, onChange, value } = props;
  const [title, setTitle] = useState<string>(value || '');
  const deleteTitle = () => {
    setTitle('');
  };
  return (
    <div className={styles.textFieldCalendar}>
      <div className={styles.inputCalendar}>
        <input type="text" value={value} onChange={onChange} />
        <div className={styles.closeCalendar} onClick={deleteTitle}>
          <Image src={closeCalendar} alt="close" width={12} height={12} />
        </div>
      </div>
      <div>
        <CustomCalendar setTitle={setTitle} dataAuto={dataAuto} />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
