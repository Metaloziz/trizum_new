import React, { FC, forwardRef, useId } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export type Option = { label: string; value: string };

interface Props {
  options: Option[];
  placeholder?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  className?: string;
  title?: string;
  error?: string;
  value: string;
  defaultValue?: Option;
}

const CustomSelect: FC<Props> = forwardRef((props, ref) => {
  const { options, placeholder, className, onChange, title, value, error, defaultValue } = props;
  const id = useId();

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          error={!!error}
          ref={ref}
          labelId="demo-simple-select-label"
          id={id}
          label={title}
          value={value || ''}
          onChange={onChange}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={error ? { color: 'red' } : {}}> {error}</FormHelperText>
      </FormControl>
    </div>
  );
});

export default CustomSelect;
