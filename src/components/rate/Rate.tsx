import React, { ChangeEvent, useEffect, useState } from 'react';

import Pagination from '@mui/material/Pagination';
import { observer } from 'mobx-react-lite';

import tariffsStore from '../../app/stores/tariffsStore';

import styles from './Rate.module.scss';

import { TariffsType } from 'app/types/TariffTypes';
import RateChoice from 'components/rate-choice/RateChoice';
import Table from 'components/table/Table';

const colNames = [
  'Название тарифа',
  'Стоимость',
  'Дата начала действия',
  'Дата окончания действия',
  'Статус',
  '',
];

const Rate = observer(() => {
  const { tariffs, getTariffs } = tariffsStore;
  const [data, setData] = useState(tariffs); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(10); // State для отображения количества элементов на каждой странице
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<TariffsType[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getTariffs();
      setLoading(false);
      setData(tariffs);
    };
    getData();
  }, []);

  useEffect(() => {
    const newData: TariffsType[] = data.filter((val: TariffsType) =>
      val.name.toLowerCase().includes(input.toLowerCase()),
    );
    setOutput(newData);
  }, [input]);

  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem = output.slice(firstItemIndex, lastItemIndex);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  };
  const filterData = (dataFilter: TariffsType[]) => {
    setData(dataFilter);
  };

  return loading ? (
    <>loading...</>
  ) : (
    <div className={styles.counter}>
      <RateChoice
        filterData={filterData}
        data={data}
        input={input}
        setInput={setInput}
        setOutput={setOutput}
        setCurrentPage={setCurrentPage}
      />
      <div className={styles.tableBlock}>
        <Table list={currentItem} colNames={colNames} loading={false}>
          {currentItem &&
            currentItem.map((el: TariffsType) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.newPrice}</td>
                <td>{new Date(el.startedAt.date).toLocaleDateString()}</td>
                <td>{new Date(el.endedAt.date).toLocaleDateString()}</td>
                <td>{el.status}</td>
              </tr>
            ))}
        </Table>
      </div>
      <div className={styles.paginationRateBlock}>
        <Pagination
          count={Math.ceil(output.length / 10)}
          onChange={paginate}
          page={currentPage}
          defaultValue={0}
          boundaryCount={1}
          color="primary"
          size="large"
        />
      </div>
    </div>
  );
});

export default Rate;
