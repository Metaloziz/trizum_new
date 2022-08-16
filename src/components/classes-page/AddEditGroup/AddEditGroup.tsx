import React, { FC, useEffect, useState } from 'react';

import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { GroupEnums, GroupType } from 'app/enums/GroupEnums';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import usersService from 'app/services/usersService';
import appStore, { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import { StatusT } from 'app/types/StatusT';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import { getOptionMui } from 'utils/getOption';

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
    isLoad,
    franchise,
    teachers,
    courses,
    loadInitialModal,
    addGroup,
    filteredCourses,
    cleanModalValues,
    visibleGroup,
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
  //
  // useEffect(() => {
  //   if (appStore.role === Roles.Admin) {
  //     debugger;
  //     setCourseOptions(courses.map(el => (el.id ? getOptionMui(el.id, el.title) : <></>)));
  //   }
  // }, [groupStore.courses]);

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
  // console.log({ ...modalFields }, 'modalFields');
  // @ts-ignore
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
                onChange={(event, child) => (modalFields.status = event.target.value as StatusT)}
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="course">Курс</InputLabel>
            <Select
              labelId="course"
              label="Курс"
              disabled={!modalFields.level}
              fullWidth
              onChange={(event, child) => (modalFields.courseId = event.target.value)}
              value={modalFields.courseId}
            >
              {courseOptions}
            </Select>
          </FormControl>
        </Grid>
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
