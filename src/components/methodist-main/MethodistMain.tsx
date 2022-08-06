import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import styles from './MethodistMain.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import { EditAddLabels } from 'app/enums/CommonEnums';
import { DateTime } from 'app/enums/DateTime';
import { GroupEnums } from 'app/enums/GroupEnums';
import coursesStore from 'app/stores/coursesStore';
import { RequestEditCourse, ResponseCourse } from 'app/types/CourseTypes';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import Pagination from 'components/molecules/Pagination';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import SettingsGames from 'components/settings-games/SettingsGames';
import Table from 'components/table/Table';
import TextField from 'components/text-field/TextField';
import { getOption } from 'utils/getOption';

export const colNames = [
  'Наименование комплекса домашнего задания',
  'Уровень группы',
  'Колличество уроков',
  'Дата создания комплекса',
  ' ',
];
const groupLevelOptions = Object.values(GroupEnums).map(el => getOption(el, el));

const MethodistMain: FC = observer(() => {
  const {
    getCourses,
    createCourse,
    courses,
    currentCourse,
    getOneCourse,
    editCourse,
    setCurrentCourse,
  } = coursesStore;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<Option>(groupLevelOptions[0]);
  const navigate = useNavigate();

  const onCloseModal = () => {
    setTitle('');
    setLevel(groupLevelOptions[0]);
    setIsModalOpen(false);
    setCurrentCourse();
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeLevel = (value: Option) => {
    value && setLevel(value);
  };

  const onSaveCourseClick = async () => {
    if (!currentCourse) {
      createCourse({ title, level: level.label, works: [] });
    }
    if (currentCourse) {
      const { id } = currentCourse;
      const newCourse: RequestEditCourse = {
        level: level.value,
        title,
        works: currentCourse?.works
          ? currentCourse.works.map(el => ({
              type: el.work.type,
              workId: el.work.id,
              index: el.index,
            }))
          : [],
      };
      await editCourse(newCourse, id);
      setCurrentCourse();
    }
    setTitle('');
    setLevel(groupLevelOptions[0]);
    setIsModalOpen(false);
  };

  const onEditHWClick = () => {
    if (currentCourse) {
      getOneCourse(currentCourse.id);
      setTimeout(() => setIsModalOpen(false));
      navigate(AppRoutes.Homework);
    }
  };

  const onSettingsClick = async (id: string) => {
    const course = courses.find(el => el.id === id);
    if (course) {
      await getOneCourse(course.id);
      setIsModalOpen(true);
      // setCurrentCourseItem(course);
      // setTitle(course.title);
      // const lvl = groupLevelOptions.filter(el => el.label === course.level)[0];
      // setLevel(lvl);
      // setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (!courses.length) {
      getCourses();
    }
  }, [courses]);

  useEffect(() => {
    if (currentCourse) {
      setTitle(currentCourse.title);
      setLevel(groupLevelOptions.filter(el => el.label === currentCourse.level)[0]);
    }
  }, [currentCourse]);

  useEffect(() => {
    if (currentCourse) {
      setCurrentCourse();
    }
  }, []);
  return (
    <div className={styles.mainBlock}>
      <div className={styles.methodistChoice}>
        <div>
          <InformationItem variant="input" title="Название" />
          <div className={styles.calendarBlock}>
            <InformationItem variant="calendar" title="Дата создания" />
          </div>
        </div>
        <div>
          <InformationItem
            className={styles.selectBlock}
            variant="select"
            title="Уровень группы"
            placeholder="Активен"
          />
          <div className={styles.inputWrap}>
            <InformationItem
              className={styles.input}
              variant="input"
              title="Колличество уроков"
              placeholder="От"
            />
            <InformationItem className={styles.input} variant="input" placeholder="До" />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <div className={styles.btnBlock}>
            <Button onClick={onOpenModal}>Добавить</Button>
          </div>
          <Button>Найти</Button>
        </div>
      </div>

      <div className={styles.tableContent}>
        <Table loading={false} colNames={colNames}>
          {courses.map(el => (
            <tr key={el.id}>
              <td>{el.title}</td>
              <td>{el.level}</td>
              <td>{el.works?.length || el.worksCount}</td>
              <td>{moment(el.createdAt.date).format(DateTime.DdMmYyyy)}</td>
              <td>
                <SettingsGames onClick={() => onSettingsClick(el.id)} />
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.pagination}>
        <Pagination
          totalCount={5}
          currentPage={1}
          pageSize={3}
          onPageChange={() => console.log('changed page')}
        />
      </div>
      <BasicModal visibility={isModalOpen} changeVisibility={onCloseModal}>
        <div className={styles.modalWrapper}>
          <h3>{currentCourse ? EditAddLabels.Edit : EditAddLabels.Add} курс</h3>
          <TextField
            onChange={onTitleChange}
            placeholder="Название курса..."
            value={title}
            label="Название курса"
          />
          <CustomSelect
            value={level}
            options={groupLevelOptions}
            placeholder="Уровень группы"
            onChange={onChangeLevel}
          />
          {/* todo: вывод домашек если редактирование курса */}
          <div className={styles.modalButtons}>
            <Button onClick={onEditHWClick}>Добавить домашнее задание</Button>
            <Button onClick={onSaveCourseClick}>Сохранить</Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
});

export default MethodistMain;
