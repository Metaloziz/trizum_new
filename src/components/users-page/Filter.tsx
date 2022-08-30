import React, { FC, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import Button from '../button/Button';

import usersStore from 'app/stores/usersStore';
import InformationItem from 'components/information-item/InformationItem';
import { Roles } from 'app/stores/appStore';
import { RoleNames } from 'app/enums/RoleNames';
import { OptionT } from 'app/types/OptionT';
import { observer } from 'mobx-react-lite';
import { RequestUsersForFilter } from 'app/types/UserTypes';

const roleOptions = [
  { label: 'Все', value: 'all' },
  { label: RoleNames.student, value: Roles.Student },
  { label: RoleNames.parent, value: Roles.Parent },
  { label: RoleNames.teacherEducation, value: Roles.TeacherEducation },
  { label: RoleNames.teacher, value: Roles.Teacher },
  { label: RoleNames.franchiseeAdmin, value: Roles.FranchiseeAdmin },
  { label: RoleNames.franchisee, value: Roles.Franchisee },
  { label: RoleNames.tutor, value: Roles.Tutor },
  { label: RoleNames.methodist, value: Roles.Methodist },
  { label: RoleNames.admin, value: Roles.Admin },
];

interface UserPageFilterProps {
  setIsModalOpen: (value: boolean) => void;
}

export const Filter: FC<UserPageFilterProps> = observer(props => {
  const {
    users,
    usersTotalCount,
    getUsers,
    getUsersForFilter,
    createUser,
    getOneUser,
    currentUser,
    page,
    perPage,
  } = usersStore;

  const [open, setOpen] = useState(false);
  const [city, setCity] = React.useState('');
  const [selectedRole, setSelectedRole] = useState<OptionT>();
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [bornDataSince, setBornDataSince] = React.useState<Date | null>(new Date('2000-01-01'));

  const handleChangeMainData = (newValue: Date | null) => {
    setBornDataSince(newValue);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const [bornDateUntil, setBornDateUntil] = React.useState<Date | null>(new Date('2000-01-02'));

  const handleChangeBornData = (newValue: Date | null) => {
    setBornDateUntil(newValue);
  };

  const onSelectRole = (option: OptionT) => {
    option.value === 'all' ? setSelectedRole(undefined) : setSelectedRole(option);
  };

  const onSearchClick = () => {
    const params: RequestUsersForFilter = {
      birthdate_since: bornDataSince?.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
    };

    console.log(params);
    getUsersForFilter(params);
  };

  return (
    <Box>
      <Accordion
        expanded={open}
        onChange={(_, expanded) => setOpen(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтрация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: '15px' }}>
              <DesktopDatePicker
                label="Дата рождения с"
                inputFormat="DD/MM/YYYY"
                value={bornDataSince}
                onChange={handleChangeMainData}
                renderInput={params => <TextField {...params} fullWidth />}
              />
              <DesktopDatePicker
                label="Дата рождения по"
                inputFormat="DD/MM/YYYY"
                value={bornDateUntil}
                onChange={handleChangeBornData}
                renderInput={params => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Оплачен</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Оплачен"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Оплачен</MenuItem>
                  <MenuItem value={20}>Неоплачен</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Город"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Москва</MenuItem>
                  <MenuItem value={20}>Санкт-Петербург</MenuItem>
                  <MenuItem value={30}>Красноярск</MenuItem>
                </Select>
              </FormControl>
              {selectedRole && (selectedRole.value as Roles) === Roles.Student && (
                <InformationItem variant="select" title="Группа" />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRole ? selectedRole.value : ''}
                  label="Роль"
                  onChange={onSelectRole as any}
                >
                  {roleOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Юр.лицо</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Юр.лицо"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>ООО Современная школа</MenuItem>
                  <MenuItem value={20}>ООО Учись играя</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Фaмилия"
                fullWidth
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Имя"
                fullWidth
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Отчество"
                fullWidth
                value={middleName}
                onChange={e => setMiddleName(e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Stack
            spacing={10}
            direction="row"
            justifyContent="space-between"
            sx={{
              width: '100%',
              px: 1,
            }}
          >
            <Button size="small" onClick={onSearchClick}>
              Найти
            </Button>
            <Button variant="addUser" size="small" onClick={() => props.setIsModalOpen(true)}>
              Добавить пользователя
            </Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});
