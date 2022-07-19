import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CustomDatePicker = ({
  label,
  value,
  setValue,
}: {
  label?: string;
  value?: any;
  setValue?: any;
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label={label}
      value={value}
      onChange={newValue => {
        setValue(newValue);
      }}
      renderInput={params => <TextField {...params} />}
    />
  </LocalizationProvider>
);

export default CustomDatePicker;
