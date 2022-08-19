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
import tariffsStore from 'app/stores/tariffsStore';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const ReportFilters = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [bday, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  const handleChangeBornData = (newValue: Date | null) => {
    setValue(newValue);
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
              <TextField id="outlined-basic" label="Город" fullWidth variant="outlined" />
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
              <TextField id="outlined-basic" label="ФИО ученика" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* isActive у user - true or false */}
              <TextField
                id="outlined-basic"
                label="Статус пользователя"
                fullWidth
                variant="outlined"
              />
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
                  value=""
                  onChange={value => console.log(value)}
                  label="Оплачен"
                >
                  <MenuItem value={10}>Оплачен</MenuItem>
                  <MenuItem value={20}>Не оплачен</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                value=""
                onChange={() => console.log('')}
                toolbarPlaceholder="Дата рождения с"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
              <DatePicker
                value=""
                onChange={() => console.log('')}
                toolbarPlaceholder="Дата рождения по"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="outlined-basic" label="Тариф" fullWidth variant="outlined" />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                value=""
                onChange={() => console.log('')}
                toolbarPlaceholder="Дата начала"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
              <DatePicker
                value=""
                onChange={() => console.log('')}
                toolbarPlaceholder="Дата окончания"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
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
            <Button>Найти</Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};

export default ReportFilters;
