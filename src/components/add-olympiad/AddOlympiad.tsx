import React, { useEffect, useState } from 'react';

import styles from './AddOlympiad.module.scss';

import image from '../../assets/svgs/icon-setting-blue.svg';

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
import { changeDateView } from 'utils/changeDateView';
import Pagination from '@mui/material/Pagination';

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
  const { groups, getGroups, getCurrentGroupFromLocalStorage, perPage, total, page } = groupStore;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<ResponseGroups>();

  const [currentPage, setCurrentPage] = useState<number>(page + 1);

  useEffect(() => {
    getFranchisee();
    getCourses({ type: 'olympiad' });
    getGroups({ type: 'olympiad', perPage, page });
  }, []);

  useEffect(() => {
    getGroups({ type: 'olympiad', perPage, page: currentPage - 1 });
  }, [currentPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
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
          {groups.map(({ id, name, startedAt, endedAt, level }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{changeDateView(startedAt.date)}</td>
              <td>{changeDateView(endedAt.date)}</td>
              <td>{GroupLevels[level]}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <Button onClick={() => setEditModal(id)}>
                  <Image src={image} />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationOlympiad}>
        <Pagination
          count={Math.floor(total / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={handleChange}
        />
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadForm setShowModal={setShowModal} mode="edite" group={currentGroup} />
      </BasicModal>
    </div>
  );
});

export default AddOlympiad;
