import React, { useEffect, useState } from 'react';

import styles from './AddOlympiad.module.scss';

import image from '../../assets/svgs/icon-setting-blue.svg';

import Pagination from 'components/molecules/Pagination';
import NameOlympiad from 'components/name-olimpiad/NameOlympiad';
import Table from 'components/table/Table';
import franchiseeStore from 'app/stores/franchiseeStore';
import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import { ResponseGroups } from 'app/types/GroupTypes';
import { GroupLevels } from 'app/enums/GroupLevels';
import Button from '@mui/material/Button';
import Image from 'components/image/Image';
import { OlympiadForm } from 'components/olympiad-page/components/OlympiadForm/OlympiadForm';
import BasicModal from 'components/basic-modal/BasicModal';
import { observer } from 'mobx-react-lite';

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

const AddOlympiad = observer(() => {
  const { getFranchisee } = franchiseeStore;
  const { getCourses } = coursesStore;
  const { groups, getGroups, getCurrentGroupFromLocalStorage } = groupStore;

  const [data, setData] = useState<ResponseGroups[]>(groups); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(9); // State для отображения количества элементов на каждой странице

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<ResponseGroups>();

  useEffect(() => {
    getFranchisee();
    getCourses({ type: 'olympiad' });
    getGroups({ type: 'olympiad' });
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

  const setEditModal = (groupId: string) => {
    setShowModal(true);
    const result = getCurrentGroupFromLocalStorage(groupId);

    setCurrentGroup(result);
  };

  return (
    <div className={styles.containerAdd}>
      <NameOlympiad />
      <div className={styles.tableWrap}>
        <h2>Список Олимпиады</h2>
        <Table colNames={colNames} loading={false}>
          {currentItem.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.startedAt.date}</td>
              <td>{item.endedAt.date}</td>
              <td>{GroupLevels[item.level]}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <Button onClick={() => setEditModal(item.id)}>
                  <Image src={image} />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationOlympiad}>
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          pageSize={data.length}
          onPageChange={paginate}
        />
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadForm setShowModal={setShowModal} mode="edite" group={currentGroup} />
      </BasicModal>
    </div>
  );
});

export default AddOlympiad;
