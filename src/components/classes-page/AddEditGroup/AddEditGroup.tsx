import React, { FC, useEffect, useState } from 'react';

import { Grid, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from './AddEditGroup.module.scss';

import {GroupEnums, GroupType} from 'app/enums/GroupEnums';
import groupStore from 'app/stores/groupStore';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import { getOption, getOptionMui } from 'utils/getOption';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const typeOptionsNames = Object.values(GroupType);
const typeOptions = Object.keys(GroupType).map((el, idx) =>
  getOptionMui(el.toLowerCase(), typeOptionsNames[idx]),
);

const levelOptionsNames = Object.values(GroupEnums);
const levelOptions = Object.keys(GroupEnums).map((el, idx) =>
  getOptionMui(el.toLowerCase(), levelOptionsNames[idx]),
);

const AddEditGroup: FC<Props> = observer(props => {
  const { setIsOpen, isOpen } = props;
  const {
    modalFields,
    validateSchema,
    isLoad,
    franchise,
    teachers,
    courses,
    loadModal,
    loadInitialModal,
    addGroup,
    filteredCourses,
    cleanModalValues,
  } = groupStore;

  useEffect(() => {
    loadInitialModal();
  }, []);

  useEffect(() => {
    loadModal();
  }, [modalFields.franchiseId]);

  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [courseOptions, setCourseOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fOptions = franchise.map(t => getOptionMui(t.id || '', t.shortName));
    setFranchiseOptions(fOptions);
  }, [franchise]);
  useEffect(() => {
    if (modalFields.franchiseId) {
      const tOptions = teachers.length
        ? teachers.map(t => getOptionMui(t.id, `${t.middleName} ${t.firstName} ${t.lastName}`))
        : [];
      setTeacherOptions(tOptions);
    }
  }, [teachers, courses]);
  useEffect(() => {
    const cOptions = filteredCourses.length
      ? filteredCourses.map(t => getOptionMui(t.id || '', t.title))
      : [];
    setCourseOptions(cOptions);
  }, [modalFields.level]);

  const handleAddGroup = async () => {
    await addGroup();
    cleanModalValues();
    setIsOpen()
  };

  const onClose = () => {
    setIsOpen();
    cleanModalValues();
  };

  return (
    <BasicModal fullWidth title="Добавить группу" visibility={isOpen} changeVisibility={onClose}>
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
          <Select
            label="Учитель"
            fullWidth
            disabled={!modalFields.franchiseId}
            onChange={(event, child) => (modalFields.teacherId = event.target.value)}
            value={modalFields.teacherId}
          >
            {teacherOptions}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            label="Франшиза"
            fullWidth
            onChange={(event, child) => (modalFields.franchiseId = event.target.value)}
            value={modalFields.franchiseId}
          >
            {franchiseOptions}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
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
          <Select
            label="Уровень"
            placeholder="Уровень"
            fullWidth
            onChange={(event, child) => (modalFields.level = event.target.value)}
            value={modalFields.level}
          >
            {levelOptions}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            label="Тип"
            fullWidth
            onChange={(event, child) => (modalFields.type = event.target.value)}
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
          <Button onClick={handleAddGroup}>Add</Button>
        </Grid>
      </Grid>
    </BasicModal>
  );
});

export default AddEditGroup;
