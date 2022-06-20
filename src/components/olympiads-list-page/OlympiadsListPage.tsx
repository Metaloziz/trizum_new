import React, { useEffect, useState } from 'react';

import CustomPagination from '@components/custom-pagination/CustomPagination';
import Table from '@components/table/Table';

import { listCurator, listCuratorType } from '../moks-data/moks-data-curator';

import styles from './OlympiadsListPage.module.scss';

export const colNames = ['№', 'ФИО', 'Возраст', 'Дата', 'Количество баллов', 'Результаты'];

const mock1 = [
  {
    id: 1,
    fullName: 'Самойленко И.Н.',
    age: '8',
    date: '11.04.2022',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 2,
    fullName: 'Камышев В.А.',
    age: '13',
    date: '2022.01.22',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 3,
    fullName: 'Самойленко И.Н.',
    age: '8',
    date: '11.04.2022',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 4,
    fullName: 'Камышев В.А.',
    age: '13',
    date: '2022.01.22',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 5,
    fullName: 'Самойленко И.Н.',
    age: '8',
    date: '11.04.2022',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 6,
    fullName: 'Камышев В.А.',
    age: '13',
    date: '2022.01.22',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 7,
    fullName: 'Самойленко И.Н.',
    age: '8',
    date: '11.04.2022',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
  {
    id: 8,
    fullName: 'Камышев В.А.',
    age: '13',
    date: '2022.01.22',
    numberPoints: '100',
    results: () => <button onClick={() => console.log('Перейти')}>Перейти</button>,
  },
];

const OlympiadsListPage = () => {
  const a = (b: number) => {};
  return (
    <div className={styles.container}>
      <h2>Результаты олимпиады</h2>
      <div className={styles.tableBlock}>
        <Table loading={false} list={mock1} colNames={colNames} />
      </div>
      <div className={styles.pagination}>
        <CustomPagination
          length={mock1.length}
          currentPage={1}
          count={2}
          total={10}
          paginate={a}
          prev={() => console.log('prev')}
          next={() => console.log('prev')}
        />
      </div>
    </div>
  );
};

export default OlympiadsListPage;
