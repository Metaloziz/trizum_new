import React, { FC } from 'react';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@pages/administrator/text-field-calendar/TextFieldCalendar';
import TextField from '@pages/administrator/text-field/TextField';
import styles from '../Administration.module.scss';

type VariantType = 'select' | 'input' | 'calendar';

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  variant: VariantType;
  option?: Option[];
}

const ListItemText: FC<Props> = ({ title, variant, option = [] }) => {
  return (
    <div className={`${styles.oneBlock} ${styles.infoBlock}`}>
      <div>
        <p>{title}</p>
      </div>
      <div className={styles.selectBlock}>
        {variant === 'select' && (
          <CustomSelect options={option} placeholder={' '} />
        )}
        {variant === 'input' && <TextField />}
        {variant === 'calendar' && <TextFieldCalendar />}
      </div>
    </div>
  );
};

export default ListItemText;
