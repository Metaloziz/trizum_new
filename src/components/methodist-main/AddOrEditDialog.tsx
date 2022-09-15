import { useEffect, useMemo } from 'react';

import {
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';

import { Dialog, DialogTitle } from '../franchising-page/ui/Dialog';

import { MethodistMainStore } from './stores';

import { GroupLevels } from 'app/enums/GroupLevels';
import Button from 'components/button/Button';
import { HomeworkStore } from 'components/homework-page/stores';
import { GroupTypes } from 'app/enums/GroupTypes';
import { getOptionMui } from 'utils/getOption';
import { ShortStatusEnum, StatusEnum } from 'app/enums/StatusTypes';

interface AddOrEditDialogProps {
  store: MethodistMainStore;
}
const groupTypesKeys = Object.keys(GroupTypes);
const statusTypesKeys = Object.keys(StatusEnum);
const levelKeys = Object.keys(GroupLevels);
const groupTypesOptions = Object.values(GroupTypes).map((el, index) =>
  getOptionMui(groupTypesKeys[index], el),
);

const levelOptions = Object.values(GroupLevels).map((el, index) =>
  getOptionMui(levelKeys[index], el),
);

export const AddOrEditDialog = observer((props: AddOrEditDialogProps) => {
  const { store } = props;
  const statusTypesOptions = Object.values(
    store.editingEntity?.id ? StatusEnum : ShortStatusEnum,
  ).map((el, index) => getOptionMui(statusTypesKeys[index], el));
  const homeworkStore = useMemo(() => new HomeworkStore(), [store.isDialogOpen]);

  useEffect(() => {
    if (store.editingEntity.type) {
      let type = '';
      switch (store.editingEntity.type) {
        case 'blocks':
          type = 'block';
          break;
        case 'class':
        case 'olympiad':
          type = 'hw';
          break;
        default:
          type = '';
      }
      homeworkStore.pull('active', 5, type);
    }
  }, [store.editingEntity.type]);

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="md"
      fullWidth
      onClose={store.closeDialog}
      open={store.isDialogOpen}
    >
      <DialogTitle onClose={store.closeDialog}>
        {store.editingEntity?.id ? 'Редактирование курса' : 'Добавление нового курса'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Наименование"
                value={store.editingEntity.title}
                onChange={({ currentTarget: { value } }) => (store.editingEntity.title = value)}
                fullWidth
                variant="outlined"
                size="small"
                error={!store.validateSchema.fields.title.isValidSync(store.editingEntity.title)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={store.editingEntity.level}
                  label="Уровень"
                  onChange={({ target: { value } }) => (store.editingEntity.level = value)}
                  error={!store.validateSchema.fields.level.isValidSync(store.editingEntity.level)}
                >
                  {levelOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Тип</InputLabel>
                <Select
                  value={store.editingEntity.type}
                  label="Тип"
                  onChange={({ target: { value } }) => (store.editingEntity.type = value)}
                  error={!store.validateSchema.fields.type.isValidSync(store.editingEntity.type)}
                >
                  {groupTypesOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select
                  value={store.editingEntity.status}
                  label="Статус"
                  onChange={({ target: { value } }) => (store.editingEntity.status = value)}
                  error={
                    !store.validateSchema.fields.status.isValidSync(store.editingEntity.status)
                  }
                >
                  {statusTypesOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Описание"
                value={store.editingEntity.description}
                onChange={({ currentTarget: { value } }) =>
                  (store.editingEntity.description = value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          {!!homeworkStore.entities.length && (
            <>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        '& > th': {
                          backgroundColor: '#2e8dfd',
                          color: '#fff',
                          verticalAlign: 'top',
                        },
                      }}
                    >
                      <TableCell role="checkbox" />
                      <TableCell>Наименование</TableCell>
                      <TableCell width="auto">Описание</TableCell>
                      <TableCell>Количество игр</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      homeworkStore.entities.map(work => (
                        <TableRow
                          key={work.id}
                          hover
                          sx={{
                            '& > td': {
                              verticalAlign: 'top',
                            },
                          }}
                        >
                          <TableCell role="checkbox">
                            <Checkbox
                              checked={(store.editingEntity.works || []).some(
                                w => w.id === work.id,
                              )}
                              size="small"
                              onChange={(__, checked) => {
                                store.editingEntity.works = checked
                                  ? [...(store.editingEntity.works || []), work]
                                  : store.editingEntity.works?.filter(w => w.id !== work.id);
                              }}
                            />
                          </TableCell>
                          <TableCell>{work.title}</TableCell>
                          <TableCell width="auto">{/* work.text */}</TableCell>
                          <TableCell>{(work.gamePresets || []).length}</TableCell>
                        </TableRow>
                      ))
                      /* ) : (
                        <TableRow>
                          <TableCell colSpan={4}>Данные отсутствуют...</TableCell>
                        </TableRow>
                      ) */
                    }
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[homeworkStore.pagination.rowsPerPage]}
                component="div"
                count={homeworkStore.pagination.total}
                rowsPerPage={homeworkStore.pagination.rowsPerPage}
                page={homeworkStore.pagination.page}
                onPageChange={(__, page) => homeworkStore.changePage(page)}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`
                }
              />
            </>
          )}
          {store.editingEntity.type && !homeworkStore.entities.length && (
            <Typography>Пока что нет домашек</Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="primary"
          onClick={store.addOrEdit}
          disabled={!store.validateSchema.isValidSync(store.editingEntity)}
        >
          {store.editingEntity?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
