import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import coursesStore from '@app/stores/coursesStore';
import { ResponseCourses } from '@app/types/CourseTypes';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import CustomPagination from '@components/custom-pagination/CustomPagination';
import InformationItem from '@components/information-item/InformationItem';
import CustomSelect, { Option } from '@components/select/CustomSelect';
import SettingsGames from '@components/settings-games/SettingsGames';
import Table from '@components/table/Table';
import TextField from '@components/text-field/TextField';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import styles from './MethodistMain.module.scss';

export const colNames = [
  'Наименование комплекса домашнего задания',
  'Уровень группы',
  'Колличество уроков',
  'Дата создания комплекса',
  ' ',
];

const levelOptions = [
  { value: 'label 1', label: 'label 1' },
  { value: 'label 2', label: 'label 2' },
  { value: 'label 3', label: 'label 3' },
];

const MethodistMain: FC = observer(() => {
  const { getCourses, createCourse, courses } = coursesStore;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<ResponseCourses>();
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const router = useRouter();
  const a = (b: number) => {};
  const onChangeVisibility = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeLevel = (value: Option) => {
    value && setLevel(value.label);
  };
  const onAddHWClick = () => {
    createCourse({ code: title });
    setIsModalOpen(false);
    // coursesStore.setNewCourse({ level, title });
    // router.push(`${Routes.Homework}/add`);
  };
  const onEditHWClick = () => {

  }

  const onSettingsClick = (id: string) => {
    const course = courses.find(el => el.id === id);
    setCurrentCourse(course);
    course && setTitle(course.code);
  };

  useEffect(() => {
    getCourses();
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
            <CustomButton onClick={onChangeVisibility}>Добавить</CustomButton>
          </div>
          <CustomButton>Найти</CustomButton>
        </div>
      </div>

      <div className={styles.tableContent}>
        <Table loading={false} colNames={colNames}>
          {courses.map(el => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.code}</td>
              <td>
                <SettingsGames onClick={() => onSettingsClick(el.id)} />
              </td>
              {/* <td>{el.groupLevel}</td> */}
              {/* <td>{el.numberLessons}</td> */}
              {/* <td>{el.date}</td> */}
              {/* <td>{el.settings}</td> */}
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.pagination}>
        <CustomPagination
          length={5}
          currentPage={1}
          count={2}
          total={3}
          paginate={a}
          prev={() => console.log('prev')}
          next={() => console.log('prev')}
        />
      </div>
      <BasicModal visibility={isModalOpen} changeVisibility={onChangeVisibility}>
        {!currentCourse && (
          <div className={styles.modalWrapper}>
            <h3>Добавить курс</h3>
            <TextField
              onChange={onTitleChange}
              placeholder="Название курса..."
              value={title}
              label="Название курса"
            />
            <CustomSelect
              options={levelOptions}
              placeholder="Уровень группы"
              onChange={onChangeLevel}
            />
            <CustomButton onClick={onAddHWClick}>Добавить курс</CustomButton>
          </div>
        )}
        {currentCourse && (
          <div className={styles.modalWrapper}>
            <h3>Редактировать курс</h3>
            <TextField
              onChange={onTitleChange}
              placeholder="Название курса..."
              value={title}
              label="Название курса"
            />
            <CustomSelect
              options={levelOptions}
              placeholder="Уровень группы"
              onChange={onChangeLevel}
            />
            <CustomButton onClick={onEditHWClick}>Добавить домашку</CustomButton>
            <CustomButton onClick={onAddHWClick}>Сохранить</CustomButton>
          </div>
        )}
      </BasicModal>
    </div>
  );
});

export default MethodistMain;
