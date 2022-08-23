import { MenuItem } from '@mui/material';

import { OptionT } from 'app/types/OptionT';

export const getOption = (value: string, label: string): OptionT => ({ value, label });
export const getOptionMui = (value: string, label: string) => (
  <MenuItem key={value} value={value}>
    {label}
  </MenuItem>
);
