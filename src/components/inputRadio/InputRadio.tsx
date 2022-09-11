import React, { FC } from 'react';
import styles from './inputRadio.module.scss';

type InputRadioPropsT = {
  value: string;
  id: string;
  name: string;
  onChange?: () => void;
  checked?: boolean;
  label?: string;
};

export const InputRadio: FC<InputRadioPropsT> = props => {
  const { value, id, name, onChange, checked, label } = props;
  return (
    <div className={styles.inputRadio}>
      <div>
        <input
          type="radio"
          value={value}
          id={id}
          name={name}
          onChange={onChange}
          checked={checked}
        />
      </div>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
