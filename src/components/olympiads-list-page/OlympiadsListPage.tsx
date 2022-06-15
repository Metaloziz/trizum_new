import React from 'react';

import CustomPagination from '@components/custom-pagination/CustomPagination';
import Table from '@components/table/Table';

import styles from './OlympiadsListPage.module.scss';

export const colNames = ['№', 'ФИО', 'Возраст', 'Дата', 'Количество баллов', 'Результаты'];

const mock1 = [
  {
    id: 1,
    fullName: 'Самойленко И.Н.',
    city: '13',
    legalAddress: '2022.01.22',
    dataInfo: '100',
    dataOgrn: '100',
  },
  {
    id: 1,
    fullName: 'Самойленко И.Н.',
    city: '13',
    legalAddress: '2022.01.22',
    dataInfo: '100',
    dataOgrn: '100',
  },
];

const OlympiadsListPage = () => {
  const a = (b: number) => {};
  return (
    <div className={styles.container}>
      <h2>Результаты олимпиады</h2>
      <Table loading={false} list={mock1} colNames={colNames} />
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
