import { FC } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { HomeworkStore } from 'components/homework-page/stores';
import { MethodistMainStore } from 'components/methodist-main/stores';

type Props = {
  homeworkStore: HomeworkStore;
  store: MethodistMainStore;
};

export const TableWorksRows: FC<Props> = ({ homeworkStore, store }) => (
  <>
    {homeworkStore.entities.map(work => (
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
            checked={(store.editingEntity.works || []).some(w => w.id === work.id)}
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
    ))}
  </>
);
