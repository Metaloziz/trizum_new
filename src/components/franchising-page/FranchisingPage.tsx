import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

import AddIcon from "@mui/icons-material/Add";
import { AddOrEditDialog } from "./AddOrEditDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Filter } from "./Filter";
import { FranchisingStore } from "components/franchising-page/stores";
import { LoadingIndicator } from "./LoadingIndicator";
import { observer } from "mobx-react";

const FranchisingPage = observer(() => {

  const store = useMemo(() => new FranchisingStore(), []);

  useEffect(() => {
    store.pull();
  }, []);

  return <Box
    sx={{
      height: "100%",
      overflow: "auto"
    }}
  >
    <LoadingIndicator isLoading={store.isLoading} />
    <AddOrEditDialog store={store} />
    <Box
      p={2}
    >
      <Box mb={1}>
        <Stack spacing={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon fontSize="small" />}
            onClick={() => store.openDialog()}
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "#2e8dfd"
            }}
          >
            Добавить
          </Button>
          <Filter store={store} />
        </Stack>
      </Box>
      <TableContainer
        component={Paper}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{
              "& > th": {
                backgroundColor: "#2e8dfd",
                color: "#fff",
                verticalAlign: "top"
              }
            }}>
              <TableCell>Полное/сокращенное наименование</TableCell>
              <TableCell>Город</TableCell>
              <TableCell>Юр. адрес</TableCell>
              <TableCell>Телефон E-mail</TableCell>
              <TableCell>ОГРН ИНН КПП</TableCell>
              <TableCell>Расчётный счёт</TableCell>
              <TableCell>Корр. счёт банка</TableCell>
              <TableCell>Наименование банка</TableCell>
              <TableCell>БИК/ИНН/КПП банка</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.entities.length
              ? store.entities.map(entity => {
                return <TableRow
                  key={entity.id}
                  hover
                  sx={{
                    "& > td": {
                      verticalAlign: "top"
                    }
                  }}
                >
                  <TableCell>
                    {entity.fullName && <><Typography variant="caption">{entity.fullName || ""}</Typography><br /></>}
                    <Typography variant="caption">{entity.shortName || ""}</Typography>
                  </TableCell>
                  <TableCell><Typography variant="caption">{entity.city || "—"}</Typography></TableCell>
                  <TableCell><Typography variant="caption">{entity.legalAddress || "—"}</Typography></TableCell>
                  <TableCell>
                    <Typography variant="caption">Телефон: {entity.phone || "—"}</Typography><br />
                    <Typography variant="caption">E-mail: {entity.email || "—"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">ОГРН: {entity.ogrn || "—"}</Typography><br />
                    <Typography variant="caption">ИНН: {entity.inn || "—"}</Typography><br />
                    <Typography variant="caption">КПП: {entity.kpp || "—"}</Typography>
                  </TableCell>
                  <TableCell><Typography variant="caption">{entity.checkingAccount || "—"}</Typography></TableCell>
                  <TableCell><Typography variant="caption">{entity.bankBill || "—"}</Typography></TableCell>
                  <TableCell><Typography variant="caption">{entity.bankName || "—"}</Typography></TableCell>
                  <TableCell>
                    <Typography variant="caption">БИК: {entity.bankBik || "—"}</Typography><br />
                    <Typography variant="caption">ИНН: {entity.bankInn || "—"}</Typography><br />
                    <Typography variant="caption">КПП: {entity.bankKpp || "—"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
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
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              })
              : <TableRow>
                <TableCell colSpan={10}>Данные отсутствуют...</TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>;
});

export default FranchisingPage;
