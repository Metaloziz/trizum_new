import React from 'react';

import CustomPagination from '@components/custom-pagination/CustomPagination';
import Table from '@components/table/Table';

import styles from './OlympiadsListPage.module.scss';

export const colNames = ['№', 'ФИО', 'Возраст', 'Дата', 'Количество баллов', 'Результаты'];
const mock = [
  {
    id: 1,
    fullName: 'Самойленко И.Н.',
    city: 'Москва',
    legalAddress: 'Москва, ул. Строителей, д.2',
    dataInfo: '+7(950)7662323 email@yandex.ru',
    dataOgrn: '1224546565155  14455546565155   4414546565155',
    paymentAccount: '1546662132212',
    bankAccount: '115665111336233',
    nameBank: 'ООО  “Альфа банк”',
    infoBank: '1224546565155   14455546565155   4414546565155',
  },
];
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
          currentItem={mock}
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
