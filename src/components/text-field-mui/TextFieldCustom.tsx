import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from './TextField.module.scss';
import {TextField} from "@mui/material";

type Props = {
  value: string;
  label?: string;
  error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextFieldCustom: FC<Props> = ({ type, onChange, value, error, label, ...rest }) => (
  /* <div className={styles.textField}>
    {label && <p>{label}</p>}
    <input {...rest} onChange={onChange} value={value} type={type || 'text'} />
    {error && <p className={styles.error}>{error}</p>}
  </div> */
    <TextField
        error={!!error}
        id="outlined-error-helper-text"
        label={label}
        defaultValue={value}
        helperText={error}
        size="small"
        onChange={onChange}
    />
);
export default TextFieldCustom;
