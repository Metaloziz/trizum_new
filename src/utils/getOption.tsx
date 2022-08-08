import { MenuItem } from '@mui/material';

import { Option } from 'components/select/CustomSelect';

export const getOption = (value: string, label: string): Option => ({ value, label });
export const getOptionMui = (value: string, label: string) => (
  <MenuItem value={value}>{label}</MenuItem>
);
