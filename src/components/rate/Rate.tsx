import React, { ChangeEvent, useEffect, useState } from 'react';

import { IconButton } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { observer } from 'mobx-react-lite';

import tariffsStore from '../../app/stores/tariffsStore';
import { newstatus } from '../tariff-page/TariffPage';

import AddOrEditDialog from './AddOrEditDialog';
import styles from './Rate.module.scss';

import { TariffsType } from 'app/types/TariffTypes';
import editImage from 'assets/svgs/edit-tariff-img.svg';
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
  const { getTariffs, filteredTariffs } = tariffsStore;
  const data: TariffsType[] = filteredTariffs;
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(10); // State для отображения количества элементов на каждой странице

  useEffect(() => {
    setLoading(true);
    getTariffs();
    setLoading(false);
  }, []);

  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  };

  return loading ? (
      <video autoPlay loop muted src={require("../../assets/videos/loader.MP4")}/>
  ) : (
    <div className={styles.counter}>
      <AddOrEditDialog store={tariffsStore} />
      <RateChoice setCurrentPage={setCurrentPage} />
      <div className={styles.tableBlock}>
        <Table list={currentItem} colNames={colNames} loading={false}>
          {currentItem &&
            currentItem.map((el: TariffsType) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.newPrice}</td>
                <td>{new Date(el.startedAt.date).toLocaleDateString()}</td>
                <td>{new Date(el.endedAt.date).toLocaleDateString()}</td>
                <td>{newstatus.find((item: any) => item.value === el.status)?.label}</td>
                <td>
                  <IconButton
                    size="small"
                    onClick={() => tariffsStore.openDialog(el)}
                    color="primary"
                  >
                    <img src={editImage} alt="editImage" />
                  </IconButton>
                </td>
              </tr>
            ))}
        </Table>
      </div>
      <div className={styles.paginationRateBlock}>
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
  );
});

export default Rate;
