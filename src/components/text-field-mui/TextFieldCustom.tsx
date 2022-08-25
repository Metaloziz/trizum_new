import {DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes} from 'react';

import {StandardTextFieldProps, TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";

interface Props extends Omit<StandardTextFieldProps, 'error'>  {
    error?: string
};

const TextFieldCustom: FC<Props> = forwardRef(({type, error, label, ...rest}, ref) => (
    /* <div className={styles.textField}>
      {label && <p>{label}</p>}
      <input {...rest} onChange={onChange} value={value} type={type || 'text'} />
      {error && <p className={styles.error}>{error}</p>}
    </div> */
    <TextField
        sx={{width: '100%'}}
        ref={ref}
        label={label}
        error={!!error}
        id="outlined-error-helper-text"
        helperText={error}
        /* size="small" */
        {...rest}
    />
));
export default TextFieldCustom;
