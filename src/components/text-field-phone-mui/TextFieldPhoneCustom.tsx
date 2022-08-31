import {DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes} from 'react';
import MuiPhoneNumber, {MuiPhoneNumberProps} from 'material-ui-phone-number';
import * as React from 'react';
import {StandardTextFieldProps} from "@mui/material";

interface Props extends Omit<MuiPhoneNumberProps, 'error'> {
  error?: string;
}

const TextFieldPhoneCustom:  React.FC<Props> = forwardRef(({ type, error, label, ...rest }, ref) => (
  <MuiPhoneNumber
    sx={{ width: '100%' }}
    defaultCountry="ru"
    onlyCountries={['ru']}
    variant="outlined"
    /* size="small" */
    countryCodeEditable={false}
    error={!!error}
    label={label}
    helperText={error}
    ref={ref}
    {...rest}
  />
));
export default TextFieldPhoneCustom;
