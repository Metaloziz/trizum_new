import { FC, forwardRef } from 'react';

import { StandardTextFieldProps, TextField } from '@mui/material';

interface Props extends Omit<StandardTextFieldProps, 'error'> {
  error?: string;
}

const TextFieldCustom: FC<Props> = forwardRef(({ type, error, label, ...rest }, ref) => (
  <TextField
    sx={{ width: '100%' }}
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
