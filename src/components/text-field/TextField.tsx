import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from './TextField.module.scss';

type Props = {
  value: string;
  label?: string;
  error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextField = (props: Props) => {
  const { type, onChange, value, error, label, ...rest } = props;
  return (
    <div className={styles.textField}>
      {label && <p>{label}</p>}
      <input {...rest} onChange={onChange} value={value} type={type || 'text'} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextField;
