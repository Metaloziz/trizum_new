import { ChangeEvent, FC, useState } from 'react';

import CustomCalendar from '@components/calendar/CustomCalendar';
import closeCalendar from '@svgs/button.svg';
import Image from 'next/image';

import styles from './TextFieldCalendar.module.scss';

interface Props {
  dataAuto: string;
  onChange?: (value: string) => void;
  value?: string;
}

const TextFieldCalendar: FC<Props> = props => {
  const { dataAuto, onChange, value } = props;
  const [title, setTitle] = useState<string>(value || '');
  const deleteTitle = () => {
    setTitle('');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onChange && onChange(e.target.value);
  };
  return (
    <div className={styles.textFieldCalendar}>
      <div className={styles.inputCalendar}>
        <input type='text' value={title} onChange={handleChange} />
        <div className={styles.closeCalendar} onClick={deleteTitle}>
          <Image src={closeCalendar} alt='close' width={12} height={12} />
        </div>
      </div>
      <div>
        <CustomCalendar setTitle={setTitle} dataAuto={dataAuto} />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
