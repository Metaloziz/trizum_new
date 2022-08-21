import { FC } from 'react';

import styles from './teacherMain.module.scss';
import ScheduleDnD from 'components/schedule/ScheduleDnD';

const groups = ['group №1', 'group №2', 'group №3'];
const schools = ['school №1', 'school №2', 'school №3'];
const cities = ['city №1', 'city №2', 'city №3'];

const TeacherMain: FC = () => (
  <div className={styles.container}>
    <ScheduleDnD />
  </div>
);
export default TeacherMain;
