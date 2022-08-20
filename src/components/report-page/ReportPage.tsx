import reportStore from 'app/stores/reportStore';
import React, { useEffect, useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import styles from './ReportPage.module.scss';

import AdminInfoList from 'components/admin-info-list/AdminInfoList';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import {
  city,
  franchisees,
  group,
  homework,
  legalAddress,
  paidFor,
} from 'components/moks-data/moks-data-select';
import { colNames, list, ListType } from 'components/moks-data/moks-data-table';
import Pagination from 'components/molecules/Pagination';
import Table from 'components/table/Table';
import ReportFilters from 'components/report-page/ReportFilters';

const ReportPage = () => {
  const { getReport, items } = reportStore;
  // const [data, setData] = useState<ListType[]>(list); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(5); // State для отображения количества элементов на каждой странице

  useEffect(() => {
    setLoading(true);
    getReport();
    setLoading(false);
  }, []);
  console.log(items);
  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem = items.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentItem.length === count) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  const [value, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  const handleChangeBornData = (newValue: Date | null) => {
    setValue(newValue);
  };
  const [dateOfBeginning, setDateOfBeginning] = React.useState<Date | null>(
    new Date('2020-01-10T21:11:54'),
  );

  const handleChangeDateOfBeginning = (newValue: Date | null) => {
    setDateOfBeginning(newValue);
  };
  const [dateOfEnd, setDateOfEnd] = React.useState<Date | null>(new Date('2020-01-10T21:11:54'));

  const handleChangeDateOfEnd = (newValue: Date | null) => {
    setDateOfEnd(newValue);
  };
  const shortName = (name: string) => name[0].toUpperCase();

  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <ReportFilters />
          <div className={styles.tableContent}>
            <Table reportlist={currentItem} colNames={colNames} loading={loading}>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {`${item.lastName} ${shortName(item.firstName)} ${shortName(item.middleName)}`}
                  </td>
                  <td>Учитель</td>
                  <td>Возраст</td>
                  <td>{item.createdAt.date}</td>
                  <td>Начало</td>
                  <td>Окончание</td>
                  <td>{item.tariff ? item.tariff.name : 'Отсутствует'}</td>
                  <td>Дата оплаты</td>
                  <td>{item.new ? 'Новый' : 'Старый'}</td>
                  <td>Адрес</td>
                </tr>
              ))}
            </Table>
          </div>
          <div className={styles.paginationBlock}>
            <Pagination
              totalCount={count}
              currentPage={currentPage}
              pageSize={list.length}
              onPageChange={paginate}
            />
          </div>
        </div>
        <div className={styles.rightBlock}>
          <AdminInfoList />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
