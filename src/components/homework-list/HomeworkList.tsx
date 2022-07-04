import React, { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './HomeworkList.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import coursesStore from 'app/stores/coursesStore';
import worksStore from 'app/stores/WorksStore';
import { RequestEditCourse, RequestEditCourseWork } from 'app/types/CourseTypes';
import Button from 'components/button/Button';
import SettingsGames from 'components/settings-games/SettingsGames';
import Table from 'components/table/Table';

export const colNames = ['Наименование домашнего задания', 'Описание', 'Колличество игр', ' '];

const HomeworkList: FC = observer(() => {
  const { homeworks, getHomeworks, currentCourse, editCourse, setCurrentCourse } = coursesStore;
  const { setCurrentWork } = worksStore;
  const [isLoaded, setIsLoaded] = useState(false);
  const [worksAr, setWorksAr] = useState(currentCourse?.works ? currentCourse?.works : []);
  const navigate = useNavigate();
  const load = async () => {
    await getHomeworks();
    setIsLoaded(true);
  };

  const onAddHomeworkClick = () => {
    navigate(`${AppRoutes.Homework}${AppRoutes.Add}`);
  };

  const onCancelEditCourse = () => {
    setCurrentCourse();
  };

  const onAddHwToCourse = (workId: string) => {
    if (currentCourse) {
      const asd = currentCourse.works
        ? currentCourse.works.map(el => ({
            type: el.work.type,
            index: el.index,
            workId: el.work.id,
          }))
        : [];
      const newWork: RequestEditCourseWork = {
        workId,
        index: currentCourse.works?.length || 0,
        type: 'homework',
      };
      const newAr = [...asd, newWork];
      const qwe: RequestEditCourse = {
        title: currentCourse.title,
        level: currentCourse.level,
        works: newAr,
      };
      editCourse(qwe, currentCourse.id);
    }
  };

  const onSettingsClick = (id: string) => {
    const work = homeworks.filter(el => el.id === id)[0];
    setCurrentWork(work);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    currentCourse && setWorksAr(currentCourse.works);
  }, [currentCourse]);

  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.container}>
      <div className={styles.menu}>
        {currentCourse && (
          <div className={styles.course}>
            <h3>Название курса: {currentCourse.title}</h3>
            <h4>Домашние работы:</h4>
            {!!worksAr?.length && worksAr.map(el => <p key={el.id}>{el.work.title}</p>)}
          </div>
        )}
        <Button onClick={onAddHomeworkClick}>Создать</Button>
        {currentCourse && (
          <Button onClick={onCancelEditCourse}>Выйти из редактирования курса</Button>
        )}
      </div>
      <Table loading={false} colNames={colNames}>
        {homeworks.map(el => (
          <tr key={el.id}>
            <td>{el.title}</td>
            <td>{el.text}</td>
            <td>{el.gamePresetCount}</td>
            <td>
              {currentCourse ? (
                <Button type="none" onClick={() => onAddHwToCourse(el.id)}>
                  add
                </Button>
              ) : (
                <SettingsGames onClick={() => onSettingsClick(el.id)} />
              )}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
});

export default HomeworkList;
