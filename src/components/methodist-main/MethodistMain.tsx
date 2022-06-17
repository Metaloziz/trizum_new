import { inspect } from 'util';

import React, { FC } from 'react';

import Button from '@components/custom-button/CustomButton';
import CustomPagination from '@components/custom-pagination/CustomPagination';
import MethodistChoice from '@components/metodist-choice/MethodistChoice';
import SettingsGames from '@components/settings-games/SettingsGames';
import Table from '@components/table/Table';
import { Routes } from '@constants/Routes';
import { useRouter } from 'next/router';

import styles from './MethodistMain.module.scss';

export const colNames = [
  'Наименование комплекса домашенго задания',
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
    settings: () => <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Светлячки',
    groupLevel: 'Второй',
    numberLessons: '8',
    date: '11.04.2022',
    settings: () => <SettingsGames />,
  },
];

const MethodistMain: FC = () => {
  const a = (b: number) => {
  };
  return (
    <div className={styles.mainBlock}>
      {/* <Button onClick={onAddTest}>Добавить тест</Button> */}
      <MethodistChoice />
      <div className={styles.tableContent}>
        <Table loading={false} list={mocks} colNames={colNames} />
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
    </div>
  );
};

export default MethodistMain;
