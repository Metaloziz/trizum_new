import { inspect } from 'util';

import React, { ChangeEvent, FC, useState } from 'react';

import coursesStore from '@app/stores/coursesStore';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import CustomPagination from '@components/custom-pagination/CustomPagination';
import { OptionsT } from '@components/homework-add-edit-page/SampleBlock/SampleBlock';
import InformationItem from '@components/information-item/InformationItem';
import MethodistChoice from '@components/metodist-choice/MethodistChoice';
import CustomSelect from '@components/select/CustomSelect';
import SettingsGames from '@components/settings-games/SettingsGames';
import Table from '@components/table/Table';
import TextField from '@components/text-field/TextField';
import { Routes } from '@constants/Routes';
import { useRouter } from 'next/router';
import { SingleValue } from 'react-select';

import styles from './MethodistMain.module.scss';

export const colNames = [
  'Наименование комплекса домашнего задания',
  'Уровень группы',
  'Колличество уроков',
  'Дата создания комплекса',
  ' ',
];

const mocks = [
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: <SettingsGames />,
  },
];
const levelOptions = [
  { value: 'label 1', label: 'label 1' },
  { value: 'label 2', label: 'label 2' },
  { value: 'label 3', label: 'label 3' },
];

const MethodistMain: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const router = useRouter();
  const a = (b: number) => {};
  const onChangeVisibility = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeLevel = (value: SingleValue<OptionsT>) => {
    value && setLevel(value.label);
  };
  const onAddHWClick = () => {
    coursesStore.setNewCourse({ level, title });
    router.push(`${Routes.Homework}/add`);
  };
  return (
    <div className={styles.mainBlock}>
      <div className={styles.methodistChoice}>
        <div>
          <InformationItem variant="input" title="Название" />
          <div className={styles.calendarBlock}>
            <InformationItem variant="calendar" title="Дата создания" />
          </div>
        </div>
        <div>
          <InformationItem
            className={styles.selectBlock}
            variant="select"
            title="Уровень группы"
            placeholder="Активен"
          />
          <div className={styles.inputWrap}>
            <InformationItem
              className={styles.input}
              variant="input"
              title="Колличество уроков"
              placeholder="От"
            />
            <InformationItem className={styles.input} variant="input" placeholder="До" />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <div className={styles.btnBlock}>
            <CustomButton onClick={onChangeVisibility}>Добавить</CustomButton>
          </div>
          <CustomButton>Найти</CustomButton>
        </div>
      </div>

      <div className={styles.tableContent}>
        <Table loading={false} colNames={colNames}>
          {mocks.map(el => (
            <tr key={el.date}>
              <td>{el.name}</td>
              <td>{el.groupLevel}</td>
              <td>{el.numberLessons}</td>
              <td>{el.date}</td>
              <td>{el.settings}</td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.pagination}>
        <CustomPagination
          length={mocks.length}
          currentPage={1}
          count={2}
          total={3}
          paginate={a}
          prev={() => console.log('prev')}
          next={() => console.log('prev')}
        />
      </div>
      <BasicModal visibility={isModalOpen} changeVisibility={onChangeVisibility}>
        <div className={styles.modalWrapper}>
          <TextField
            onChange={onTitleChange}
            placeholder="Название курса..."
            value={title}
            label="Название курса"
          />
          <CustomSelect
            options={levelOptions}
            placeholder="Уровень группы"
            onChange={onChangeLevel}
          />
        </div>
        <CustomButton onClick={onAddHWClick}>Добвить домашку</CustomButton>
      </BasicModal>
    </div>
  );
};

export default MethodistMain;
