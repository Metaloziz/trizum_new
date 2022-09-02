import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from 'components/button/Button';
import { Button as EditButton, Pagination } from '@mui/material';
import testsStore from 'app/stores/testsStore';
import { observer } from 'mobx-react-lite';
import Table from 'components/table/Table';
import style from './TestsList.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import { TestEditForm } from 'pages/testing/TestsList/TestEditForm/TestEditForm';

const colNames = ['№', 'Наименование', 'Редактировать'];

export const TestsList = observer(() => {
  const { setTests, tests, total, perPage, page, setSearchParams } = testsStore;

  const [currentPage, setCurrentPage] = useState(page + 1);
  const [showModal, setShowModal] = useState(false);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    setSearchParams({ page: newCurrentPage - 1 });
    setTests();
  };

  useEffect(() => {
    setSearchParams({ page: 0 });
    setTests();
  }, []);

  return (
    <div className={style.container}>
      <h2>Список тестов</h2>
      <Button onClick={() => setShowModal(true)}>Добавить тест</Button>
      <Table colNames={colNames}>
        {tests.map(({ id, title }, index) => (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>
              <EditButton>Редактировать</EditButton>
              <EditButton color="error">Удалить</EditButton>
            </td>
          </tr>
        ))}
      </Table>

      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(total / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <TestEditForm changeVisibility={setShowModal} />
      </BasicModal>
    </div>
  );
});
