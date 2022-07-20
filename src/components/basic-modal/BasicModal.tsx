import React, { FC } from 'react';

import DialogContent from '@mui/material/DialogContent';

import { Dialog, DialogTitle } from '../franchising-page/ui/Dialog';

interface Props {
  children?: React.ReactNode;
  visibility: boolean;
  changeVisibility: (value: boolean) => void;
}

const BasicModal: FC<Props> = ({ children, visibility, changeVisibility }) => (
  <Dialog
    PaperProps={{
      style: {
        borderRadius: '30px',
      },
    }}
    maxWidth="md"
    // fullWidth
    onClose={() => changeVisibility(false)}
    open={visibility}
  >
    <DialogTitle onClose={() => changeVisibility(false)} />
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default BasicModal;
