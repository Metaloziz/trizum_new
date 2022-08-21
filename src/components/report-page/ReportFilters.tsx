import React, { useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from 'components/button/Button';
import { observer } from 'mobx-react-lite';
import reportStore from '../../app/stores/reportStore';
import { Nullable } from '../../app/types/Nullable';

type ReportFiltersType = {
  setCurrentPage: (page: number) => void;
};

const ReportFilters: React.FC<ReportFiltersType> = observer(({ setCurrentPage }) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  // const [bday, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  const { setFilters } = reportStore;
  const [cityName, setCityName] = useState<string>('');
  const [pupilName, setPupilName] = useState<string>('');
  const [tariff, setTariff] = useState<string>('');
  const [isActiveStatus, setIsActiveStatus] = useState<Nullable<string>>(null);
  const [isPaidStatus, setIsPaidStatus] = useState<Nullable<string>>(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  // const [input, setInput] = useState('');

  const searchHandler = () => {
    setFilters({ cityName, pupilName, isActiveStatus, isPaidStatus, dateFrom, dateTo, tariff });
    setCurrentPage(1);
  };
  const resetHandler = () => {
    setCityName('');
    setPupilName('');
    setIsActiveStatus(null);
    setIsPaidStatus(null);
    setDateFrom(null);
    setDateTo(null);
    setTariff('');
    setFilters({
      setCityName: '',
      setPupilName: '',
      isActiveStatus: '',
      isPaidStatus: '',
      dateFrom: '',
      dateTo: '',
      tariff: '',
    });
    setCurrentPage(1);
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 3 }}>
      <Accordion
        expanded={isOpenFilters}
        onChange={(_, expanded) => setIsOpenFilters(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтрация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-basic"
                label="Город"
                fullWidth
                variant="outlined"
                onChange={({ currentTarget: { value } }) => setCityName(value)}
                value={cityName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="group">Группа</InputLabel>
                <Select
                  labelId="group"
                  id="group"
                  value=""
                  onChange={value => console.log(value)}
                  label="Группа"
                >
                  <MenuItem value={10}>group1</MenuItem>
                  <MenuItem value={20}>group2</MenuItem>
                  <MenuItem value={30}>group3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* TODO: это поле под вопросом - спросить у Александра нужно ли оно, если да - разбить на Имя Фамилию и отчество отдельно */}
              <TextField
                id="outlined-basic"
                label="ФИО ученика"
                fullWidth
                variant="outlined"
                value={pupilName}
                onChange={({ currentTarget: { value } }) => setPupilName(value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* isActive у user - true or false */}
              <FormControl fullWidth>
                <InputLabel id="status">Статус</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  value={isActiveStatus}
                  onChange={({ target: { value } }) => setIsActiveStatus(value)}
                  label="Статус"
                >
                  <MenuItem value="true">Активный</MenuItem>
                  <MenuItem value="false">Не активный</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="franchise">Франчайзинг</InputLabel>
                <Select
                  labelId="franchise"
                  id="franchise"
                  value=""
                  onChange={value => console.log(value)}
                  label="Франчайзинг"
                >
                  <MenuItem value={10}>franchisees1</MenuItem>
                  <MenuItem value={20}>franchisees2</MenuItem>
                  <MenuItem value={30}>franchisees3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="payment">Оплачен</InputLabel>
                <Select
                  labelId="payment"
                  id="payment"
                  value={isPaidStatus}
                  onChange={({ target: { value } }) => setIsPaidStatus(value)}
                  label="Оплачен"
                >
                  <MenuItem value="true">Оплачен</MenuItem>
                  <MenuItem value="false">Не оплачен</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                value={dateFrom}
                onChange={setDateFrom}
                toolbarPlaceholder="Дата рождения с"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
              <DatePicker
                value={dateTo}
                onChange={setDateTo}
                toolbarPlaceholder="Дата рождения по"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-basic"
                label="Тариф"
                fullWidth
                variant="outlined"
                value={tariff}
                onChange={({ currentTarget: { value } }) => setTariff(value)}
              />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <DatePicker */}
              {/*  value="" */}
              {/*  onChange={() => console.log('')} */}
              {/*  toolbarPlaceholder="Дата начала" */}
              {/*  renderInput={props => <TextField sx={{ width: '48%' }} {...props} />} */}
              {/* /> */}
              {/* <DatePicker */}
              {/*  value="" */}
              {/*  onChange={() => console.log('')} */}
              {/*  toolbarPlaceholder="Дата окончания" */}
              {/*  renderInput={props => <TextField sx={{ width: '48%' }} {...props} />} */}
              {/* /> */}
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            sx={{
              width: '100%',
              px: 1,
            }}
          >
            <Button variant="addExel">Выгрузить в Excel</Button>
            <Button onClick={resetHandler}>Сбросить</Button>
            <Button onClick={searchHandler}>Найти</Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});

export default ReportFilters;
