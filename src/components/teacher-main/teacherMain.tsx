import { FC } from 'react';

import styles from './teacherMain.module.scss';
import ScheduleDnD from 'components/schedule/ScheduleDnD';

const TeacherMain: FC = () => (
  <div className={styles.container}>
    <ScheduleDnD />
  </div>
);
export default TeacherMain;
