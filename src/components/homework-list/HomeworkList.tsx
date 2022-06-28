import React, { FC, useEffect } from 'react';

import coursesService from '@app/services/coursesService';
import coursesStore from '@app/stores/coursesStore';
import Table from '@components/table/Table';
import { observer } from 'mobx-react-lite';

import styles from './HomeworkList.module.scss';

export const colNames = [
  'Наименование комплекса домашнего задания',
  'Уровень группы',
  'Колличество уроков',
  'Дата создания комплекса',
  ' ',
];

const HomeworkList: FC = observer(() => {
  const { homeworks, getHomeworks } = coursesStore;
  useEffect(() => {
    getHomeworks();
  }, []);
  console.log(homeworks);
  return (
    <div className={styles.container}>
      <Table loading={false} colNames={colNames}>
        {homeworks.map(el => (
          <tr key={el.id}>
            <td>{el.id}</td>
            <td>{el.code}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
});

export default HomeworkList;
