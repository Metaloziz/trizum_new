import React, { FC, useEffect, useState } from 'react';

import { Grid, InputLabel, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from './AddEditGroup.module.scss';

import { GroupEnums, GroupType } from 'app/enums/GroupEnums';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import { GroupT, LevelGroupT } from 'app/types/GroupTypes';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
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
  console.log(modalFields.teacherId);
  console.log(courses, 'courses');
  console.log([...groupStore.teachers]);
  useEffect(() => {
    loadInitialModal();
  }, []);

  useEffect(() => {
    getTeachers();
  }, [modalFields.franchiseId]);

  useEffect(() => {
    const fOptions = franchise.map(t => getOptionMui(t.id || '', t.shortName));
    setFranchiseOptions(fOptions);
    setCourseOptions(courses.map(el => (el.id ? getOptionMui(el.id, el.title) : <></>)));
  }, [franchise, courses]);

  useEffect(() => {
    const cOptions = filteredCourses.length
      ? filteredCourses.map(t => getOptionMui(t.id || '', t.title))
      : [];
    setCourseOptions(cOptions);
  }, [modalFields.level]);

  const handleAddGroup = async () => {
    await addGroup();
    cleanModalValues();
    closeModal();
  };

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
        </Grid>
        {selectedGroup ? (
          <Grid item xs={12} sm={6}>
            <InputLabel id="status">Статус</InputLabel>
            <Select
              labelId="status"
              label="Статус"
              fullWidth
              onChange={(event, child) => (modalFields.status = event.target.value)}
              value={modalFields.status}
            >
              {statusOptions}
            </Select>
          </Grid>
        ) : (
          <Grid item xs={12} sm={6}>
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
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="level">Уровень</InputLabel>
          <Select
            labelId="level"
            label="Уровень"
            placeholder="Уровень"
            fullWidth
            onChange={(event, child) => (modalFields.level = event.target.value as LevelGroupT)}
            value={modalFields.level}
          >
            {levelOptions}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="type">Тип</InputLabel>
          <Select
            labelId="type"
            label="Тип"
            fullWidth
            onChange={(event, child) => (modalFields.type = event.target.value as GroupT)}
            value={modalFields.type}
          >
            {typeOptions}
          </Select>
        </Grid>
        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Button onClick={() => (selectedGroup ? editGroup() : handleAddGroup())}>Add</Button>
        </Grid>
      </Grid>
    </BasicModal>
  );
});

export default AddEditGroup;
