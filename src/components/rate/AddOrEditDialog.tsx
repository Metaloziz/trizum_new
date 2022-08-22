import { DialogContent } from '@mui/material';
import { observer } from 'mobx-react';

import tariffsStore from '../../app/stores/tariffsStore';
import TariffPage from '../tariff-page/TariffPage';

import { Dialog, DialogTitle } from './ui/Dialog';

export const AddOrEditDialog = observer(() => {
  const { closeDialog, isDialogOpen, tariff } = tariffsStore;
  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="xl"
      fullWidth
      onClose={closeDialog}
      open={isDialogOpen}
    >
      <DialogTitle onClose={closeDialog}>
        {tariff?.id ? 'Редактирование тарифа' : 'Добавление нового тарифа'}
      </DialogTitle>
      <DialogContent dividers>
        <TariffPage />
      </DialogContent>
    </Dialog>
  );
});

export default AddOrEditDialog;
