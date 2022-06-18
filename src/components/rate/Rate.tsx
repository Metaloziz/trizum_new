import React, {FC, ReactNode, useEffect, useState} from 'react';

import CustomPagination, { CurrentItemType } from '@components/custom-pagination/CustomPagination';
import { listCurator, listCuratorType } from '@components/moks-data/moks-data-curator';
import RateChoice from '@components/rate-choice/RateChoice';
import SettingsGames from '@components/settings-games/SettingsGames';
import { settings } from '@components/settings-games/SettingsGames.module.scss';
import Table from '@components/table/Table';

import styles from './Rate.module.scss';

const colNames = [
  'Название тарифа',
  'Стоимость',
  'Дата начала действия',
  'Дата окончания действия',
  'Название  тарифа',
  'Статус',
  '',
];
type Mock1 ={
  name:string
  price:string
  dataStart:string
  dateEnd:string
  nameTariff:string
  status:string
  settings: ()=>JSX.Element
}
const mocks1:Mock1[] = [
  {
    name: 'Самойленко И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Болдырев И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Волков И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Безверхов И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Бакузов И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Кружкин И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Ложкин И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Цапля И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Кисилев И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Лампочкин И.Н.',
    price: 'Москва',
    dataStart: 'Москва, ул. Строителей, д.2',
    dateEnd: '+7(950)7662323 email@yandex.ru',
    nameTariff: '1224546565155   14455546565155   4414546565155',
    status: '1546662132212',
    settings: () => <SettingsGames />,
  },
];

const Rate: FC = () => {
  const [data, setData] = useState(mocks1); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(4); // State для отображения количества элементов на каждой странице
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
  console.log(currentItem);
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
    <div className={styles.counter}>
      <RateChoice />
      <div className={styles.tableBlock}>
        <Table list={currentItem} colNames={colNames} loading={false}>
          {currentItem.map((el) => (
            <tr key={el.name}>
              <td>{el.name}</td>
              <td>{el.price}</td>
              <td>{el.dataStart}</td>
              <td>{el.dateEnd}</td>
              <td>{el.nameTariff}</td>
              <td>{el.status}</td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationRateBlock}>
        <CustomPagination
          currentPage={currentPage}
          length={currentItem.length}
          paginate={paginate}
          count={count}
          next={nextPage}
          prev={prevPage}
          total={mocks1.length}
        />
      </div>
    </div>
  );
};

export default Rate;
