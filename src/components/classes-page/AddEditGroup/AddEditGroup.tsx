import React, { FC, useEffect, useState } from 'react';

import { BorderBottom } from '@mui/icons-material';
import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import { DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import styles from './AddEditGroup.module.scss';

import { DateTime } from 'app/enums/DateTime';
import { GroupEnums, GroupType } from 'app/enums/GroupEnums';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import usersService from 'app/services/usersService';
import appStore, { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import { GroupT, LevelGroupT } from 'app/types/GroupTypes';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import Lessons from 'components/classes-page/AddEditGroup/Lessons';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import { getOption, getOptionMui } from 'utils/getOption';

interface Props {}

const typeOptionsNames = Object.values(GroupType);
const typeOptions = Object.keys(GroupType).map((el, idx) =>
  getOptionMui(el.toLowerCase(), typeOptionsNames[idx]),
);

const groupStatuses = {
  active: 'Активный',
  complete: 'Завершенный',
  archive: 'Архивный',
};
const statusOptions: JSX.Element[] = [];
// eslint-disable-next-line guard-for-in
for (const key in groupStatuses) {
  // @ts-ignore
  statusOptions.push(getOptionMui(key, groupStatuses[key]));
}

const levelOptionsNames = Object.values(GroupEnums);
const levelOptions = Object.keys(GroupEnums).map((el, idx) =>
  getOptionMui(el.toLowerCase(), levelOptionsNames[idx]),
);

const AddEditGroup: FC<Props> = observer(props => {
  const {
    modalFields,
    validateSchema,
    franchise,
    loadInitialModal,
    addGroup,
    filteredCourses,
    cleanModalValues,
    selectedGroup,
    isModalOpen,
    closeModal,
    editGroup,
  } = groupStore;

  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [courseOptions, setCourseOptions] = useState<JSX.Element[]>([]);
  const getTeachers = async () => {
    if (modalFields.franchiseId) {
      const res = await usersService.getAllUsers({
        perPage: 10000,
        franchiseId: modalFields.franchiseId,
        role: Roles.Teacher,
      });
      groupStore.teachers = res.items;
      setTeacherOptions(res.items.map(el => getOptionMui(el.id, el.firstName)));
    }
  };
  const initLoad = async () => {
    const resFranchise = await franchiseService.getAll();
    const resCourses = await coursesService.getAllCourses({ perPage: 10000 });
    setFranchiseOptions(resFranchise.map(t => getOptionMui(t.id || '', t.shortName)));
    setCourseOptions(resCourses.items.map(el => (el.id ? getOptionMui(el.id, el.title) : <></>)));
  };
  useEffect(() => {
    loadInitialModal();
  }, []);

  useEffect(() => {
    if (modalFields.franchiseId) {
      getTeachers();
    }
  }, [modalFields.franchiseId]);
  useEffect(() => {
    if (appStore.role === Roles.Admin && !!franchise.length) {
      // debugger;
      setFranchiseOptions(franchise.map(t => getOptionMui(t.id || '', t.shortName)));
    }
  }, [groupStore.franchise]);

  useEffect(() => {
    const cOptions = filteredCourses.length
      ? filteredCourses.map(t => getOptionMui(t.id || '', t.title))
      : [];
    setCourseOptions(cOptions);
  }, [modalFields.level]);

  const onClose = () => {
    closeModal();
    cleanModalValues();
  };

  return (
    <BasicModal
      fullWidth
      title={selectedGroup ? 'Редактировать группу' : 'Добавить группу'}
      visibility={isModalOpen}
      changeVisibility={onClose}
    >
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: 2,
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="Название"
            value={modalFields.name}
            fullWidth
            onChange={({ currentTarget: { value } }) => (modalFields.name = value)}
            error={!validateSchema.fields.name.isValidSync(modalFields.name)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="teacher">Учитель</InputLabel>
            <Select
              labelId="teacher"
              label="Учитель"
              fullWidth
              disabled={!modalFields.franchiseId}
              onChange={(event, child) => (modalFields.teacherId = event.target.value)}
              value={modalFields.teacherId}
            >
              {teacherOptions}
            </Select>
          </FormControl>
        </Grid>
        {selectedGroup ? (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status">Статус</InputLabel>
              <Select
                labelId="status"
                label="Статус"
                fullWidth
                // @ts-ignore
                onChange={(event, child) => (modalFields.status = event.target.value)}
                value={modalFields.status}
              >
                {statusOptions}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="franchise">Франшиза</InputLabel>
              <Select
                labelId="franchise"
                label="Франшиза"
                fullWidth
                onChange={(event, child) => (modalFields.franchiseId = event.target.value)}
                value={modalFields.franchiseId}
              >
                {franchiseOptions}
              </Select>
            </FormControl>
          </Grid>
        )}
        {!selectedGroup && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="course">Курс</InputLabel>
              <Select
                labelId="course"
                label="Курс"
                disabled={!modalFields.level}
                fullWidth
                onChange={({ target: { value } }) => {
                  const course = groupStore.courses.find(el => el.id === value);
                  course &&
                    (groupStore.schedule = groupStore.setEmptyScheduleItems(course.worksCount));
                  modalFields.courseId = value;
                }}
                value={modalFields.courseId}
              >
                {courseOptions}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="level">Уровень</InputLabel>
            <Select
              labelId="level"
              label="Уровень"
              placeholder="Уровень"
              fullWidth
              // @ts-ignore
              onChange={(event, child) => (modalFields.level = event.target.value)}
              value={modalFields.level}
            >
              {levelOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DatePicker
            onChange={e => e && (modalFields.dateSince = new Date(e))}
            value={modalFields.dateSince}
            renderInput={e => <TextField {...e} sx={{ width: '48%' }} />}
          />
          <DatePicker
            onChange={e => e && (modalFields.dateUntil = new Date(e))}
            value={modalFields.dateUntil}
            renderInput={e => <TextField {...e} sx={{ width: '48%' }} />}
          />
        </Grid>

        {/* lessons */}
        <Lessons />

        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Button onClick={() => (selectedGroup ? editGroup() : addGroup())}>
            {selectedGroup ? 'Изменить' : 'Добавить'}
          </Button>
        </Grid>
      </Grid>
    </BasicModal>
  );
});

export default AddEditGroup;
