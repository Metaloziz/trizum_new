import { FunctionComponent } from 'react';
import Schedule from '@components/schedule/Schedule';
import TeacherSearchBar from '@components/teacher-searchBar/TeacherSearchBar';
import styles from './TeacherMain.module.scss';

const groups = ['group №1', 'group №2', 'group №3'];
const schools = ['school №1', 'school №2', 'school №3'];
const cities = ['city №1', 'city №2', 'city №3'];

const IndexPage: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <TeacherSearchBar cities={cities} groups={groups} schools={schools} />
      <Schedule />
    </div>
  );
};

export default IndexPage;
