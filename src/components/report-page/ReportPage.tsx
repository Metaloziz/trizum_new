import React, { useState } from 'react';

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
  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <div className={styles.wrapBlock}>
            <div className={styles.infoBlock}>
              <InformationItem
                size="large"
                title="Выполнил Д/З"
                variant="select"
                option={homework}
              />
              <InformationItem size="large" title="Город" variant="select" option={city} />
              <InformationItem size="large" title="Группа" variant="select" option={group} />
              <InformationItem
                title="ФИО ученика"
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
              <InformationItem
                title="Статус пользователя"
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
            </div>
            <div className={`${styles.infoBlock} ${styles.franchiseesBlock}`}>
              <InformationItem title="ФИО франчази" variant="select" option={franchisees} />
              <InformationItem size="large" title="Оплачен" variant="select" option={paidFor} />
              <InformationItem title="Дата рождения" variant="calendar" dataAuto="dateBirth" />
              <InformationItem
                title="Возраст"
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
            </div>
            <div className={`${styles.infoBlock} ${styles.legalAddress}`}>
              <InformationItem title="Юр. адрес" variant="select" option={legalAddress} />
              <InformationItem
                title="Дата начала действия"
                variant="calendar"
                dataAuto="dateStart"
              />
              <InformationItem
                title="Дата окончания действия"
                variant="calendar"
                dataAuto="dateEnd"
              />
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
