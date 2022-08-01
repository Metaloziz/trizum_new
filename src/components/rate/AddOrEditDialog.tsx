import { DialogActions, DialogContent } from '@mui/material';
import { observer } from 'mobx-react';

import Button from '../button/Button';
import TariffPage from '../tariff-page/TariffPage';

import { Dialog, DialogTitle } from './ui/Dialog';

export const AddOrEditDialog = observer((props: any) => {
  const { store } = props;
  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="xl"
      fullWidth
      onClose={store.closeDialog}
      open={store.isDialogOpen}
    >
      <DialogTitle onClose={store.closeDialog}>
        {store.editingEntity?.id ? 'Редактирование записи' : 'Добавление новой записи'}
      </DialogTitle>
      <DialogContent dividers>
        <TariffPage store={store} />
      </DialogContent>
    </Dialog>
  );
});

export default AddOrEditDialog;
