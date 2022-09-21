import { StatusTypes } from 'app/enums/StatusTypes';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { TableWorksRows } from 'components/methodist-main/components/TableWorksRows';
import { HomeworkStore } from 'components/homework-page/stores';
import { MethodistMainStore } from 'components/methodist-main/stores';
import { FC } from 'react';

type Props = {
  homeworkStore: HomeworkStore;
  store: MethodistMainStore;
};

export const TableWorks: FC<Props> = ({ store, homeworkStore }) => (
  <>
    {store.editingEntity.status === StatusTypes.active && !!homeworkStore.entities.length && (
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
              <TableWorksRows homeworkStore={homeworkStore} store={store} />
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
  </>
);
