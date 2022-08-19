import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import style from './OlympiadsPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { getRandomId } from 'utils/getRandomId';

function createData(name: string, age: number, date: string, score: number) {
  return { id: getRandomId(), name, age, date, score };
}

const olympiads = [
  createData('Иванов Иван Ивановчи1', 159, '01.02.02', 242),
  createData('Иванов Иван Ивановчи2', 15, '01.02.02', 1124),
  createData('Иванов Иван Ивановчи3', 19, '01.02.02', 222224),
];

type Props = Record<string, unknown>;

const OlympiadsPage: FC<Props> = () => (
  <div className={style.container}>
    <h2>Список олимпиад</h2>
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
            <TableCell>№</TableCell>
            <TableCell>ФИО</TableCell>
            <TableCell>Возраст</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Результат</TableCell>
            <TableCell>Перейти</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {olympiads.length ? (
            olympiads.map(entity => (
              <TableRow
                key={entity.id}
                hover
                sx={{
                  '& > td': {
                    verticalAlign: 'top',
                  },
                }}
              >
                <TableCell>
                  <Typography variant="caption">{entity.id || ''}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{entity.name || '—'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{entity.age || '—'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{entity.date || '—'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{entity.score || '—'}</Typography>
                </TableCell>
                <TableCell>
                  <RedirectCurrentPageButton
                    title="перейти"
                    rout={`${AppRoutes.Olympiads}/${entity.id}`}
                    size="small"
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>Данные отсутствуют...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default OlympiadsPage;
