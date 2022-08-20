import reportStore from 'app/stores/reportStore';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './ReportPage.module.scss';
import AdminInfoList from 'components/admin-info-list/AdminInfoList';

import { colNames, list } from 'components/moks-data/moks-data-table';
import Table from 'components/table/Table';
import ReportFilters from 'components/report-page/ReportFilters';
import { observer } from 'mobx-react-lite';
import { Loader } from '../loader/Loader';
import Pagination from '@mui/material/Pagination';

const ReportPage = observer(() => {
  const { getReport, reports: data } = reportStore;
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(10); // State для отображения количества элементов на каждой страницеd

  useEffect(() => {
    setLoading(true);
    getReport();
    setLoading(false);
  }, []);

  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  };

  const shortName = (name: string) => name[0].toUpperCase();
  // TODO в хелперы

  const columnNames = [
    'ФИО ученика', // last + first + middle
    'Франшиза', // franchise.shortName
    'Дата регистрации', // createdAt
    'Оплачен',
    'Дата окончания действия',
    'Тариф',
      'Статус',
  ];
  const createDate = (date: string) => new Date(date).toLocaleDateString();
  // TODO helpers DATEFUNCTIONS
  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <ReportFilters />
          <div className={styles.tableContent}>
            <Table reportlist={currentItem} colNames={columnNames} loading={loading}>
              {currentItem.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    {`${item.lastName} ${shortName(item.firstName)}.${shortName(item.middleName)}.`}
                  </td>
                  <td>{item?.franchise?.shortName}</td>
                  <td>{createDate(item?.createdAt.date)}</td>
                  <td>{item.isPayed ? 'Да' : 'Нет'}</td>
                  <td>{createDate(item?.payedUntil?.date) || ''}</td>
                  <td>{item?.tariff ? item.tariff?.name : 'Отсутствует'}</td>


                </tr>
              ))}
            </Table>
          </div>
          <div className={styles.paginationBlock}>
            <Pagination
              count={Math.ceil(data.length / 10)}
              onChange={paginate}
              page={currentPage}
              defaultValue={0}
              boundaryCount={1}
              color="primary"
              size="large"
            />
          </div>
        </div>
        <div className={styles.rightBlock}>
          <AdminInfoList />
        </div>
      </div>
    </div>
  );
});

export default ReportPage;
