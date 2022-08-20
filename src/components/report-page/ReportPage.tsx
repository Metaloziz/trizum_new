import reportStore from 'app/stores/reportStore';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './ReportPage.module.scss';
import AdminInfoList from 'components/admin-info-list/AdminInfoList';
import Table from 'components/table/Table';
import ReportFilters from 'components/report-page/ReportFilters';
import { observer } from 'mobx-react-lite';
import { Loader } from '../loader/Loader';
import Pagination from '@mui/material/Pagination';
import { shortenName, transformDate } from '../../utils/transformData';

const columnNames = [
  'ФИО ученика',
  'Франшиза',
  'Дата регистрации',
  'Оплачен',
  'Дата окончания действия',
  'Тариф',
  'Статус',
];

const ReportPage = observer(() => {
  const { getReport, reports: data } = reportStore;
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(10); // State для отображения количества элементов на каждой странице

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

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <ReportFilters />
          <div className={styles.tableContent}>
            <Table reportlist={currentItem} colNames={columnNames} loading={loading}>
              {currentItem.map(item => (
                <tr key={item.id}>
                  <td>
                    {`${item.lastName} ${shortenName(item.firstName)}.${shortenName(
                      item.middleName,
                    )}.`}
                  </td>
                  <td>{item?.franchise?.shortName || 'Нет данных'}</td>
                  <td>{transformDate(item?.createdAt?.date) || 'Нет данных'}</td>
                  <td>{item?.isPayed ? 'Да' : 'Нет'}</td>
                  <td>{transformDate(item?.payedUntil?.date) || 'Нет данных'}</td>
                  <td>{item?.tariff ? item.tariff?.name : 'Отсутствует'}</td>
                  <td>{item?.new ? 'Новый' : 'Старый'}</td>
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
