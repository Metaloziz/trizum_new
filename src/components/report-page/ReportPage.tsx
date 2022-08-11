import React, { useState } from 'react';

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



const ReportPage = () => {
  const [data, setData] = useState<ListType[]>(list); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(5); // State для отображения количества элементов на каждой странице

  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem = data.slice(firstItemIndex, lastItemIndex);

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
  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChangeBornData = (newValue: Date | null) => {
    setValue(newValue);
  };
  const [dateOfBeginning, setDateOfBeginning] = React.useState<Date | null>(
    new Date('2020-01-10T21:11:54'),
  );

  const handleChangeDateOfBeginning = (newValue: Date | null) => {
    setDateOfBeginning(newValue);
  };
  const [dateOfEnd, setDateOfEnd] = React.useState<Date | null>(
    new Date('2020-01-10T21:11:54'),
  );

  const handleChangeDateOfEnd = (newValue: Date | null) => {
    setDateOfEnd(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <div className={styles.wrapBlock}>
            <div className={styles.infoBlock}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Выполнил Д/З</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={Age}
                  label="Выполнил Д/З"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>Выполнено</MenuItem>
                  <MenuItem value={20}>Не выполнено</MenuItem>
                  <MenuItem value={30}>Выполняю</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={Age}
                  label="Город"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>Москва</MenuItem>
                  <MenuItem value={20}>Ростов</MenuItem>
                  <MenuItem value={30}>Новосибирск</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Группа</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={Age}
                  label="Группа"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>group1</MenuItem>
                  <MenuItem value={20}>group2</MenuItem>
                  <MenuItem value={30}>group3</MenuItem>
                </Select>
              </FormControl>
              <TextField id="outlined-basic" label="ФИО ученика" variant="outlined" />
              <TextField id="outlined-basic" label="Статус пользователя" variant="outlined" />
            </div>
            <div className={`${styles.infoBlock} ${styles.franchiseesBlock}`}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ФИО франчази</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={Age}
                  label="ФИО франчази"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>franchisees1</MenuItem>
                  <MenuItem value={20}>franchisees2</MenuItem>
                  <MenuItem value={30}>franchisees3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Оплачен</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={Age}
                  label="Оплачен"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>paidFor1</MenuItem>
                  <MenuItem value={20}>paidFor2</MenuItem>
                  <MenuItem value={30}>paidFor3</MenuItem>
                </Select>
              </FormControl>
              <div style={{ width: '100%' }}>
                <DesktopDatePicker
                  label="Дата рождения"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChangeBornData}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <TextField id="outlined-basic" label="Возраст" variant="outlined" />
            </div>
            <div className={`${styles.infoBlock} ${styles.legalAddress}`}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Юр.адрес</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={Age}
                  label="Юр.адрес"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>legalAddress1</MenuItem>
                  <MenuItem value={20}>legalAddress2</MenuItem>
                  <MenuItem value={30}>legalAddress3</MenuItem>
                </Select>
              </FormControl>
              <div style={{ width: '100%' }}>
                <DesktopDatePicker
                  label="Дата начала действия"
                  inputFormat="dd/MM/yyyy"
                  value={dateOfBeginning}
                  onChange={handleChangeDateOfBeginning}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div style={{ width: '100%' }}>
                <DesktopDatePicker
                  label="Дата окончания действия"
                  inputFormat="dd/MM/yyyy"
                  value={dateOfEnd}
                  onChange={handleChangeDateOfEnd}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div className={styles.btnBlock}>
                <Button variant="addExel">Выгрузить в Excel</Button>
                <Button>Найти</Button>
              </div>
            </div>
          </div>
          <div className={styles.tableContent}>
            <Table list={currentItem} colNames={colNames} loading={loading} />
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
