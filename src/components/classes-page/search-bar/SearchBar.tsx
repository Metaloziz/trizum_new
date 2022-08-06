import React, { useEffect, useState } from 'react';

import { Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from './SearchBar.module.scss';

import { GroupEnums, GroupType } from 'app/enums/GroupEnums';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import Button from 'components/button/Button';
import StudentPageSlider from 'components/classes-page/search-bar/student-page-slider/StudentPageSlider';
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
    getFranchises();
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

  return (
    <div className={styles.wrapper}>
      {/* <SearchByGroup /> */}
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
        {/* TODO */}
        {/* <Select
          placeholder="ForGroup"
          value={queryFields.teacherId}
          onChange={({ target: { value } }) => changeQueryFields(value, 'teacherId')}
        >
          {teacherOptions}
        </Select> */}
        {/* <DateTimePicker
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
        /> */}
      </div>
      <StudentPageSlider />
    </div>
  );
});

export default SearchBar;
