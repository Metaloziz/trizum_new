import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import testsStore from 'app/stores/testsStore';
import { observer } from 'mobx-react-lite';
import Table from 'components/table/Table';
import style from './TestsList.module.scss';
import { Pagination } from '@mui/material';
import BasicModal from 'components/basic-modal/BasicModal';
import { TestEditForm } from 'pages/testing/TestsList/TestEditForm/TestEditForm';

const colNames = ['№', 'Наименование', 'Редактировать'];

export const TestsList = observer(() => {
  const { setTests, tests, testsTotalCount, perPage, page } = testsStore;

  const [currentPage, setCurrentPage] = useState(page + 1);
  const [showModal, setShowModal] = useState(false);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    setTests({ page: newCurrentPage });
  };

  useEffect(() => {
    setTests({ page: currentPage - 1 });
  }, []);

  return (
    <div className={style.container}>
      <h2>Список тестов</h2>
      <Button
        type="button"
        color="primary"
        size="large"
        variant="outlined"
        onClick={() => setShowModal(true)}
      >
        Добавить тест
      </Button>
      <Table colNames={colNames}>
        {tests.map(({ id, title }, index) => (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>
              <Button>Редактировать</Button>
            </td>
          </tr>
        ))}
      </Table>

      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(testsTotalCount / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <TestEditForm />
      </BasicModal>
    </div>
  );
});
