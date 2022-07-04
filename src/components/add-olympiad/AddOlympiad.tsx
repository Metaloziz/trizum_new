import React, { useEffect, useState } from 'react';

import styles from './AddOlympiad.module.scss';

import Pagination from 'components/molecules/Pagination';
import NameOlympiad from 'components/name-olimpiad/NameOlympiad';
import SettingsGames from 'components/settings-games/SettingsGames';
import Table from 'components/table/Table';

const colNames = [
  'Название олимпиады',
  'Дата и время начала',
  'Дата и время окончания',
  'Группа',
  'Тип группы',
  'Город',
  'Адрес школы',
  '',
];

type Mock1 = {
  name: string;
  dateStart: string;
  dateEnd: string;
  group: string;
  typeGroup: string;
  city: string;
  address: string;
  settings: () => JSX.Element;
};

const mocks: Mock1[] = [
  {
    name: 'Память и ритм',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Мухи в кубе',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Светлячки',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Память',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Ритм',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Память и ритм и светлячки',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Роль',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
  {
    name: 'Что то еще',
    dateStart: '11/04/2021 08:00',
    dateEnd: '11/04/2021 10:00',
    group: 'Средняя',
    typeGroup: '100',
    city: 'Москва',
    address: 'Ул. Кирова, д. 6',
    settings: () => <SettingsGames />,
  },
];

const AddOlympiad = () => {
  const [data, setData] = useState(mocks); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(2); // State для отображения количества элементов на каждой странице
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
    <div className={styles.containerAdd}>
      <NameOlympiad />
      <div className={styles.tableWrap}>
        <h2>Список Олимпиады</h2>
        <Table colNames={colNames} loading={false}>
          {currentItem.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.dateStart}</td>
              <td>{item.dateEnd}</td>
              <td>{item.group}</td>
              <td>{item.typeGroup}</td>
              <td>{item.city}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationOlympiad}>
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          pageSize={mocks.length}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default AddOlympiad;
