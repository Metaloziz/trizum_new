import React, { FC, useEffect, useState } from 'react';

import { Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from './AddEditGroup.module.scss';

import { GroupLevels } from 'app/enums/GroupLevels';
import groupStore from 'app/stores/groupStore';
import BasicModal from 'components/basic-modal/BasicModal';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import { getOption, getOptionMui } from 'utils/getOption';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}
export enum GroupType {
  Class = 'Класс',
  Olympiad = 'Олимпиада',
}
const typeOptionsNames = Object.values(GroupType);
const typeOptions = Object.keys(GroupType).map((el, idx) =>
  getOptionMui(el.toLowerCase(), typeOptionsNames[idx]),
);

const levelOptionsNames = Object.values(GroupLevels);
const levelOptions = Object.keys(GroupLevels).map((el, idx) =>
  getOptionMui(el.toLowerCase(), levelOptionsNames[idx]),
);

const AddEditGroup: FC<Props> = observer(props => {
  const { setIsOpen, isOpen } = props;
  const { modalFields, validateSchema, isLoad, franchise, teachers, courses, loadModal } =
    groupStore;

  useEffect(() => {
    loadModal();
  }, []);

  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [courseOptions, setCourseOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const tOptions = teachers.map(t =>
      getOptionMui(t.id, `${t.middleName} ${t.firstName} ${t.lastName}`),
    );
    const fOptions = franchise.map(t => getOptionMui(t.id || '', t.shortName));
    const cOptions = courses.map(t => getOptionMui(t.id || '', t.title));
    setTeacherOptions(tOptions);
    setFranchiseOptions(fOptions);
    setCourseOptions(cOptions);
  }, [teachers, franchise]);

  return (
    <BasicModal title="Добавить группу" visibility={isOpen} changeVisibility={setIsOpen}>
      <div className={styles.col}>
        <TextField
          label="Название"
          value={modalFields.name}
          onChange={({ currentTarget: { value } }) => (modalFields.name = value)}
          error={!validateSchema.fields.name.isValidSync(modalFields.name)}
        />
        <Select
          label="Учитель"
          onChange={(event, child) => (modalFields.teacherId = event.target.value)}
          value={modalFields.teacherId}
        >
          {teacherOptions}
        </Select>
        <Select
          label="Франшиза"
          onChange={(event, child) => (modalFields.franchiseId = event.target.value)}
          value={modalFields.franchiseId}
        >
          {franchiseOptions}
        </Select>
        <Select
          label="Курс"
          onChange={(event, child) => (modalFields.courseId = event.target.value)}
          value={modalFields.courseId}
        >
          {courseOptions}
        </Select>
        <Select
          label="Уровень"
          onChange={(event, child) => (modalFields.level = event.target.value)}
          value={modalFields.level}
        >
          {levelOptions}
        </Select>
        <Select
          label="Тип"
          onChange={(event, child) => (modalFields.level = event.target.value)}
          value={modalFields.level}
        >
          {typeOptions}
        </Select>
      </div>
    </BasicModal>
  );
});

export default AddEditGroup;
