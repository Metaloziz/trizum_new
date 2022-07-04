import React from 'react';

import styles from './OlympiadsListPage.module.scss';

import Pagination from 'components/molecules/Pagination';
import Table from 'components/table/Table';

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
  const fake = () => {};
  const fake1 = (num: number) => {};
  return (
    <div className={styles.container}>
      <h2>Результаты олимпиады</h2>
      <div className={styles.tableBlock}>
        <Table loading={false} colNames={colNames} />
      </div>
      <div className={styles.pagination}>
        <Pagination totalCount={10} currentPage={1} pageSize={mock1.length} onPageChange={fake1} />
      </div>
    </div>
  );
};

export default OlympiadsListPage;
