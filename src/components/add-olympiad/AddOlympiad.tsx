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
import appStore, { Roles } from 'app/stores/appStore';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';

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

const isEditRole = (roleDate: Roles) => {
  switch (roleDate) {
    case 'admin':
    case 'methodist':
      return true;
    default:
      return false;
  }
};

const AddOlympiad = observer(() => {
  const navigate = useNavigate();

  const { role } = appStore;
  const { getFranchisee } = franchiseeStore;
  const { getCourses } = coursesStore;
  const { groups, getGroups, getCurrentGroupFromLocalStorage, perPage, total, page, getOneGroup } =
    groupStore;

  const IS_EDIT_ROLE = isEditRole(role as Roles);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<ResponseGroups>();

  const [currentPage, setCurrentPage] = useState<number>(page + 1);

  useEffect(() => {
    getFranchisee();
    getCourses({ type: 'olympiad' });
    getGroups({ type: 'olympiad', perPage, page });
  }, []);

  useEffect(() => {
    getGroups({ type: 'olympiad', perPage: 10, page: currentPage - 1 });
  }, [currentPage, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const setEditModal = (groupId: string) => {
    setShowModal(true);
    const result = getCurrentGroupFromLocalStorage(groupId);

    setCurrentGroup(result);
  };

  const redirect = (groupId: string) => {
    getOneGroup(groupId);
    navigate(AppRoutes.OlympiadsListPage);
  };

  const count = Math.ceil(total / perPage);

  return (
    <div className={styles.containerAdd}>
      <NameOlympiad isEditRole={IS_EDIT_ROLE} />
      <div className={styles.tableWrap}>
        <h2>Список Олимпиады</h2>
        <Table colNames={colNames} loading={false}>
          {groups.map(({ id, name, startedAt, endedAt, level }) => (
            <tr key={id} onClick={() => redirect(id)}>
              <td>{name}</td>
              <td>{changeDateView(startedAt.date)}</td>
              <td>{changeDateView(endedAt.date)}</td>
              <td>{GroupLevels[level]}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                {IS_EDIT_ROLE && (
                  <Button
                    className={styles.settingOlympiad}
                    onClick={event => {
                      event.stopPropagation();
                      setEditModal(id);
                    }}
                  >
                    <Image src={image} />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationOlympiad}>
        <Pagination
          count={count}
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
