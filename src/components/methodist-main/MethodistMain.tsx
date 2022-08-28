import { useEffect, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { AddOrEditDialog } from './AddOrEditDialog';
import { Filter } from './Filter';
import { MethodistMainStore } from './stores';

import { RequestEditCourse, ResponseCourse } from 'app/types/CourseTypes';
import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';

const MethodistMain = observer(() => {
  // const {
  //   getCourses,
  //   createCourse,
  //   courses,
  //   currentCourse,
  //   getOneCourse,
  //   editCourse,
  //   setCurrentCourse,
  // } = coursesStore;
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [title, setTitle] = useState("");
  // const [level, setLevel] = useState<OptionT>(groupLevelOptions[0]);
  // const navigate = useNavigate();

  // const onSaveCourseClick = async () => {
  //   if (!currentCourse) {
  //     createCourse({ title, level: level.label, works: [] });
  //   }
  //   if (currentCourse) {
  //     const { id } = currentCourse;
  //     const newCourse: RequestEditCourse = {
  //       level: level.value,
  //       title,
  //       works: currentCourse?.works
  //         ? currentCourse.works.map(el => ({
  //             type: el.work.type,
  //             workId: el.work.id,
  //             index: el.index,
  //           }))
  //         : [],
  //     };
  //     await editCourse(newCourse, id);
  //     setCurrentCourse();
  //   }
  //   setTitle("");
  //   setLevel(groupLevelOptions[0]);
  //   setIsModalOpen(false);
  // };

  // const onSettingsClick = async (id: string) => {
  //   const course = courses.find(el => el.id === id);
  //   if (course) {
  //     await getOneCourse(course.id);
  //     setIsModalOpen(true);
  //     // setCurrentCourseItem(course);
  //     // setTitle(course.title);
  //     // const lvl = groupLevelOptions.filter(el => el.label === course.level)[0];
  //     // setLevel(lvl);
  //     // setIsModalOpen(true);
  //   }
  // };

  const store = useMemo(() => new MethodistMainStore(), []);

  useEffect(() => {
    store.pull();
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
      }}
    >
      <LoadingIndicator isLoading={store.isLoading} />
      <AddOrEditDialog store={store} />
      <Snackbar
        open={store.success !== null}
        autoHideDuration={6000}
        onClose={() => (store.success = null)}
      >
        <Alert onClose={() => (store.success = null)} severity="success" sx={{ width: '100%' }}>
          {store.success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={store.error !== null}
        autoHideDuration={6000}
        onClose={() => (store.error = null)}
      >
        <Alert onClose={() => (store.error = null)} severity="error" sx={{ width: '100%' }}>
          {store.error?.message || 'Произошла ошибка!'}
        </Alert>
      </Snackbar>
      <Box p={2}>
        <Box mb={1}>
          <Stack spacing={1}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
              onClick={() => store.openDialog()}
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: '#2e8dfd',
              }}
            >
              Добавить
            </Button>
            <Filter onChange={store.onChangeFilter} />
          </Stack>
        </Box>
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
                <TableCell>Наименование</TableCell>
                <TableCell>Уровень</TableCell>
                <TableCell>Колличество курсов</TableCell>
                <TableCell>Дата создания</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {store.filteredEntities.length ? (
                store.filteredEntities.map(entity => (
                  <TableRow
                    key={entity.id}
                    hover
                    sx={{
                      '& > td': {
                        verticalAlign: 'top',
                      },
                    }}
                  >
                    <TableCell>{entity.title}</TableCell>
                    <TableCell>{entity.level}</TableCell>
                    <TableCell>{entity.worksCount}</TableCell>
                    <TableCell>{/* entity.createdAt?.date || "" */}</TableCell>
                    <TableCell>
                      <Stack direction="row" justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => store.openDialog(entity)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => store.remove(entity.id!)}
                          color="error"
                          disabled
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>Данные отсутствуют...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[store.pagination.rowsPerPage]}
          component="div"
          count={store.pagination.total}
          rowsPerPage={store.pagination.rowsPerPage}
          page={store.pagination.page}
          onPageChange={(_, page) => store.changePage(page)}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`
          }
        />
      </Box>
    </Box>
  );
});

export default MethodistMain;
