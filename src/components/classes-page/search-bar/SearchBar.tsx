import React, { useEffect, useState } from 'react';

import { Select, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { observer } from 'mobx-react-lite';

import styles from './SearchBar.module.scss';

import { GroupEnums, GroupType } from 'app/enums/GroupEnums';
import franchiseService from 'app/services/franchiseService';
import groupStore from 'app/stores/groupStore';
import SearchByGroup from 'components/classes-page/search-bar/search-by-groups/SearchByGroup';
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
  const { queryFields, changeQueryFields } = groupStore;
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [groupOptions, setGroupOptions] = useState<JSX.Element[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);
  // const franchiseOptions = getOptionMui('', ''); // request
  // const groupOptions = getOptionMui('', '');
  // const teacherOptions = getOptionMui('', ''); // request
  const getFranchises = async () => {
    const res = await franchiseService.getAll();
    const options = res.map(el => (el.id ? getOptionMui(el.id, el.shortName) : <></>));
    setFranchiseOptions(options);
  };
  useEffect(() => {
    getFranchises();
  }, [queryFields.franchiseId]);
  return (
    <div className={styles.wrapper}>
      {/* <SearchByGroup /> */}
      <div className={styles.fields}>
        <TextField
          value={queryFields.name}
          placeholder="Название"
          onChange={({ currentTarget: { value } }) => changeQueryFields(value, 'name')}
        />
        <Select placeholder="Франчайзинг">{franchiseOptions}</Select>
        <Select
          placeholder="Уровень"
          value={queryFields.level}
          onChange={({ target: { value } }) => changeQueryFields(value, 'level')}
        >
          {levelOptions}
        </Select>
        <Select
          placeholder="Тип"
          value={queryFields.type}
          onChange={({ target: { value } }) => changeQueryFields(value, 'type')}
        >
          {typeOptions}
        </Select>
        <Select placeholder="Группа">{groupOptions}</Select>
        <Select
          placeholder="Учитель"
          value={queryFields.teacherId}
          onChange={({ target: { value } }) => changeQueryFields(value, 'teacherId')}
        >
          {teacherOptions}
        </Select>
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
