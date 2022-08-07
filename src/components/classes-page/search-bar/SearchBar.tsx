import React, { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import styles from './SearchBar.module.scss';

import { DateTime } from 'app/enums/DateTime';
import { GroupEnums, GroupType } from 'app/enums/GroupEnums';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import usersService from 'app/services/usersService';
import appStore, { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import Button from 'components/button/Button';
import StudentPageSlider from 'components/classes-page/search-bar/student-page-slider/StudentPageSlider';
import { numberWithoutLeadingZero } from 'components/franchising-page/helpers/numberWithoutLeadingZero';
import { getOptionMui } from 'utils/getOption';

const typeOptionsNames = Object.values(GroupType);
const typeOptions = Object.keys(GroupType).map((el, idx) =>
  getOptionMui(el.toLowerCase(), typeOptionsNames[idx]),
);

const levelOptionsNames = Object.values(GroupEnums);
const levelOptions = Object.keys(GroupEnums).map((el, idx) =>
  getOptionMui(el.toLowerCase(), levelOptionsNames[idx]),
);

const SearchBar = observer(() => {
  const { queryFields, getGroups, clearQueryFields } = groupStore;
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [courseOptions, setCourseOptions] = useState<JSX.Element[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);

  const getFranchises = async () => {
    const res = await franchiseService.getAll();
    const res1 = await coursesService.getAllCourses({ perPage: 10000 });
    const options = res.map(el => (el.id ? getOptionMui(el.id, el.shortName) : <></>));
    setFranchiseOptions(options);
    setCourseOptions(res1.items.map(el => (el.id ? getOptionMui(el.id, el.title) : <></>)));
  };
  useEffect(() => {
    if (appStore.role === Roles.Admin) {
      getFranchises();
    }
  }, []);

  const getTeachers = async () => {
    if (queryFields.franchiseId) {
      const res = await usersService.getAllUsers({
        perPage: 10000,
        franchiseId: queryFields.franchiseId,
        role: Roles.Teacher,
      });
      groupStore.teachers = res.items;
      setTeacherOptions(res.items.map(el => getOptionMui(el.id, el.firstName)));
    }
  };

  useEffect(() => {
    getTeachers();
  }, [queryFields.franchiseId]);

  /* temp */
  const [open, setOpen] = useState(false);
  /* temp */

  return (
    <>
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
              {/* line 1 */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  value={queryFields.name}
                  label="Название"
                  onChange={({ currentTarget: { value } }) => (queryFields.name = value)}
                />
              </Grid>
              {appStore.role === Roles.Admin && (
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="franchise-search">Франчайзинг</InputLabel>
                    <Select
                      labelId="franchise-search"
                      label="Франчайзинг"
                      value={queryFields.franchiseId}
                      onChange={({ target: { value } }) => (queryFields.franchiseId = value)}
                    >
                      {franchiseOptions}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="level-search">Уровень</InputLabel>
                  <Select
                    labelId="level-search"
                    label="Уровень"
                    value={queryFields.level}
                    onChange={({ target: { value } }) => (queryFields.level = value)}
                  >
                    {levelOptions}
                  </Select>
                </FormControl>
              </Grid>

              {appStore.role === Roles.Admin && (
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="course-search">Курс</InputLabel>
                    <Select label="Курс" labelId="course-search">
                      {courseOptions}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="teacher-search">Учитель</InputLabel>
                  <Select
                    labelId="teacher-search"
                    label="Учитель"
                    value={queryFields.teacherId}
                    disabled={!queryFields.franchiseId}
                    onChange={({ target: { value } }) => (queryFields.teacherId = value)}
                  >
                    {teacherOptions}
                  </Select>
                  {!queryFields.franchiseId && (
                    <FormHelperText
                      sx={{ position: 'absolute', bottom: -24, left: 0, color: 'red' }}
                    >
                      Сначала выберите франчайзинг
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* line 3 */}
              <Grid item xs={12} sm={4}>
                <DatePicker
                  onChange={value => value && (queryFields.dateSince = value)}
                  value={queryFields.dateSince}
                  toolbarPlaceholder="Дата с"
                  renderInput={props => <TextField {...props} />}
                />
                <DatePicker
                  onChange={(value, keyboardInputValue) => {
                    console.log(
                      value && moment(new Date(value)).format(DateTime.DdMmYyyy),
                      'asdasd',
                    );
                    value && (queryFields.dateUntil = value);
                  }}
                  value={queryFields.dateUntil}
                  toolbarPlaceholder="Дата по"
                  renderInput={props => <TextField {...props} />}
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
              <Button onClick={getGroups}>Применить</Button>
              <Button onClick={clearQueryFields}>Сбросить</Button>
            </Stack>
          </AccordionActions>
        </Accordion>
      </Box>
      {/* <div className={styles.wrapper}>
         <SearchByGroup />
        <div className={styles.fields}>
          <TextField
            value={queryFields.name}
            placeholder="Название"
            onChange={({ currentTarget: { value } }) => (queryFields.name = value)}
          />
          <Select
            placeholder="Франчайзинг"
            value={queryFields.franchiseId}
            onChange={({ target: { value } }) => (queryFields.franchiseId = value)}
          >
            {franchiseOptions}
          </Select>
          <Select
            placeholder="Уровень"
            value={queryFields.level}
            onChange={({ target: { value } }) => (queryFields.level = value)}
          >
            {levelOptions}
          </Select>
          <Select
            placeholder="Тип"
            value={queryFields.type}
            onChange={({ target: { value } }) => (queryFields.type = value)}
          >
            {typeOptions}
          </Select>
          <Select placeholder="Группа">{courseOptions}</Select>
          <Select
            placeholder="Учитель"
            value={queryFields.teacherId}
            disabled={!queryFields.franchiseId}
            onChange={({ target: { value } }) => (queryFields.teacherId = value)}
          >
            {teacherOptions}
          </Select>
          <Button onClick={getGroups}>Search</Button>
          <Button onClick={clearQueryFields}>Reset</Button>
           TODO
           <Select
          placeholder="ForGroup"
          value={queryFields.teacherId}
          onChange={({ target: { value } }) => changeQueryFields(value, 'teacherId')}
        >
          {teacherOptions}
        </Select>
           <DateTimePicker
          onChange={value => value && changeQueryFields(value, 'dateSince')}
          value={queryFields.dateSince}
          toolbarPlaceholder="Дата с"
          renderInput={props => <TextField />}
        />
        <DateTimePicker
          onChange={value => value && changeQueryFields(value, 'dateUntil')}
          value={queryFields.dateUntil}
          toolbarPlaceholder="Дата по"
          renderInput={props => <TextField value={props.value} />}
        />
        </div>
         <StudentPageSlider />
      </div> */}
    </>
  );
});

export default SearchBar;
