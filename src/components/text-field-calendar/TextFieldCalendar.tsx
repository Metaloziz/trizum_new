import { ChangeEvent, FC, useState } from 'react';

import styles from './TextFieldCalendar.module.scss';

import closeCalendar from 'assets/svgs/button.svg';
import CustomCalendar from 'components/calendar/CustomCalendar';
import Image from 'components/image/Image';

interface Props {
  dataAuto: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
}

const TextFieldCalendar = (props: Props) => {
  const { dataAuto, onChange, value, label } = props;
  const [title, setTitle] = useState<string>(value || '');
  const deleteTitle = () => {
    setTitle('');
  };
  return (
    <div className={styles.textFieldCalendar}>
      {label && <p>{label}</p>}
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
