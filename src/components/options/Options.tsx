import React, { FC, FunctionComponent, ReactElement } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { OptionT } from 'app/types/OptionT';

type Props = {
  options: OptionT[];
};

export const Options = ({ options }: Props): ReactElement[] =>
  options.map(option => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));
