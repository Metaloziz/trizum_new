import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './ReportPage.module.scss';
import AdminInfoList from 'components/admin-info-list/AdminInfoList';
import Table from 'components/table/Table';
import ReportFilters from 'components/report-page/ReportFilters';
import { observer } from 'mobx-react-lite';
import { Loader } from '../loader/Loader';
import Pagination from '@mui/material/Pagination';
import { shortenName, transformDate } from 'utils/transformData';
import { ReportItemsT } from '../../app/types/ReportT';
import reportStore from '../../app/stores/reportStore';

const columnNames = [
  'ФИО ученика',
  'Город',
  'Статус',
  'Франшиза',
  'Дата рождения',
  'Оплачен',
  'Дата окончания действия',
  'Тариф',
];

const ReportPage = observer(() => {
  const { getReports, reports: data, total } = reportStore;
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(10); // State для отображения количества элементов на каждой странице

  useEffect(() => {
    setLoading(true);
    getReports();
    setLoading(false);
  }, []);

  // TODO useEffect на смену страниц, и отправку нового запроса.

  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem: ReportItemsT[] = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <ReportFilters setCurrentPage={setCurrentPage} />
          <div className={styles.tableContent}>
            <Table reportlist={currentItem} colNames={columnNames} loading={loading}>
              {currentItem.map(item => (
                <tr key={item.id}>
                  <td>
                    {`${item.lastName} ${shortenName(item.firstName)}.${shortenName(
                      item.middleName,
                    )}.`}
                  </td>
                  <td>{item?.city || 'Нет данных'}</td>
                  <td>{item?.isActive ? 'Активный' : 'Не активный'}</td>
                  <td>{item?.franchise?.shortName || 'Нет данных'}</td>
                  <td>{transformDate(item?.birthdate?.date) || 'Нет данных'}</td>
                  <td>{item?.isPayed ? 'Оплачен' : 'Не оплачен'}</td>
                  <td>{transformDate(item?.payedUntil?.date) || 'Нет данных'}</td>
                  <td>{item?.tariff ? item.tariff?.name : 'Нет данных'}</td>
                </tr>
              ))}
            </Table>
          </div>
          <div className={styles.paginationBlock}>
            <Pagination
              count={Math.ceil(total / count)}
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
