import { Checkbox, DialogActions, DialogContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Dialog, DialogTitle } from "../franchising-page/ui/Dialog";
import { useEffect, useMemo } from "react";

import AddIcon from "@mui/icons-material/Add";
import Button from "components/button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupLevels } from "app/enums/GroupLevels";
import { HomeworkStore } from "components/homework-page/stores";
import { MethodistMainStore } from "./stores";
import { observer } from "mobx-react";

interface AddOrEditDialogProps {
  store: MethodistMainStore;
}

export const AddOrEditDialog = observer((props: AddOrEditDialogProps) => {
  const { store } = props;

  const homeworkStore = useMemo(() => new HomeworkStore(), [store.isDialogOpen]);

  useEffect(() => {
    if (store.isDialogOpen) {
      homeworkStore.pull();
    }
  }, [store.isDialogOpen])

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: "30px",
        },
      }}
      maxWidth="md"
      fullWidth
      onClose={store.closeDialog}
      open={store.isDialogOpen}
    >
      <DialogTitle onClose={store.closeDialog}>
        {store.editingEntity?.id ? "Редактирование записи" : "Добавление новой записи"}
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
                error={
                  !store.validateSchema.fields.title.isValidSync(store.editingEntity.title)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size='small'>
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={store.editingEntity.level}
                  label="Уровень"
                  onChange={({ target: { value } }) => store.editingEntity.level = value}
                >
                  <MenuItem value="">Не выбрано</MenuItem>
                  <MenuItem value={GroupLevels.Easy}>{GroupLevels.Easy}</MenuItem>
                  <MenuItem value={GroupLevels.Medium}>{GroupLevels.Medium}</MenuItem>
                  <MenuItem value={GroupLevels.Hard}>{GroupLevels.Hard}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& > th": {
                      backgroundColor: "#2e8dfd",
                      color: "#fff",
                      verticalAlign: "top",
                    },
                  }}
                >
                  <TableCell role="checkbox">
                  </TableCell>
                  <TableCell>
                    Наименование
                  </TableCell>
                  <TableCell width="auto">
                    Описание
                  </TableCell>
                  <TableCell>
                    Колличество игр
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*TODO: доделать*/}
                {homeworkStore.entities.length > 0
                  ? homeworkStore.entities.map(work => {
                    return <TableRow
                      key={work.id}
                      hover
                      sx={{
                        "& > td": {
                          verticalAlign: "top",
                        },
                      }}
                    >
                      <TableCell role="checkbox">
                        <Checkbox
                          checked={(store.editingEntity.works || []).some(w => w.id === work.id)}
                          size="small"
                          onChange={(_, checked) => {
                            store.editingEntity.works = checked
                              ? [...store.editingEntity.works || [], work]
                              : store.editingEntity.works?.filter(w => w.id !== work.id);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {work.title}
                      </TableCell>
                      <TableCell width="auto">
                        {/*work.text*/}
                      </TableCell>
                      <TableCell>
                        {(work.gamePresets || []).length}
                      </TableCell>
                    </TableRow>
                  })
                  : <TableRow>
                    <TableCell colSpan={4}>Данные отсутствуют...</TableCell>
                  </TableRow>
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
            onPageChange={(_, page) => homeworkStore.changePage(page)}
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="primary"
          onClick={store.addOrEdit}
          disabled={!store.validateSchema.isValidSync(store.editingEntity)}
        >
          {store.editingEntity?.id ? "Изменить" : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
