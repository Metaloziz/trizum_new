import { useEffect, useState } from 'react';

import AdminInfoList from '@components/admin-info-list/AdminInfoList';
import CustomButton from '@components/custom-button/CustomButton';
import CustomPagination from '@components/custom-pagination/CustomPagination';
import InformationItem from '@components/information-item/InformationItem';
import {
  homework,
  group,
  city,
  franchisees,
  paidFor,
  legalAddress,
} from '@components/moks-data/moks-data-select';
import { colNames, list, ListType } from '@components/moks-data/moks-data-table';
import Table from '@components/table/Table';

import styles from './ReportPage.module.scss';

const ReportPage = () => {
  const [data, setData] = useState<ListType[]>(list); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(5); // State для отображения количества элементов на каждой странице
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // пример запроса на сервер
      // const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      // setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

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
                size='large'
                title='Выполнил Д/З'
                variant='select'
                option={homework}
              />
              <InformationItem size='large' title='Город' variant='select' option={city} />
              <InformationItem size='large' title='Группа' variant='select' option={group} />
              <InformationItem
                title='ФИО ученика'
                variant='input'
                onChange={valueText => console.log(valueText)}
              />
              <InformationItem
                title='Статус пользователя'
                variant='input'
                onChange={valueText => console.log(valueText)}
              />
            </div>
            <div className={`${styles.infoBlock} ${styles.franchiseesBlock}`}>
              <InformationItem title='ФИО франчази' variant='select' option={franchisees} />
              <InformationItem size='large' title='Оплачен' variant='select' option={paidFor} />
              <InformationItem title='Дата рождения' variant='calendar' dataAuto='dateBirth' />
              <InformationItem
                title='Возраст'
                variant='input'
                onChange={valueText => console.log(valueText)}
              />
            </div>
            <div className={`${styles.infoBlock} ${styles.legalAddress}`}>
              <InformationItem title='Юр. адрес' variant='select' option={legalAddress} />
              <InformationItem
                title='Дата начала действия'
                variant='calendar'
                dataAuto='dateStart'
              />
              <InformationItem
                title='Дата окончания действия'
                variant='calendar'
                dataAuto='dateEnd'
              />
              <div className={styles.btnBlock}>
                <CustomButton type='addExel'>Выгрузить в Excel</CustomButton>
                <CustomButton>Найти</CustomButton>
              </div>
            </div>
          </div>
          <div className={styles.tableContent}>
            <Table list={currentItem} colNames={colNames} loading={loading} />
          </div>
          <div className={styles.paginationBlock}>
            <CustomPagination
              currentPage={currentPage}
              currentItem={currentItem}
              paginate={paginate}
              count={count}
              next={nextPage}
              prev={prevPage}
              total={list.length}
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
