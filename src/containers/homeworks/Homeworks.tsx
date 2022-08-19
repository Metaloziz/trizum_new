import { FC } from 'react';

import classNames from 'classnames';

import styles from './Homeworks.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import { HomeworksProps } from 'app/types/ComponentsProps';
import Homework from 'components/homework/Homework';
import Panel from 'components/panel/Panel';

const Homeworks: FC<HomeworksProps> = ({ homeworks, className }) => {
  const { role } = appStore;
  return (
    <div className={classNames(styles.container, className)}>
      <Panel className={styles.panel}>Домашнее задание на 1 сентября 2022</Panel>
      {role === Roles.TeacherEducation && (
        <Panel className={styles.panel}>Наименование олимпиады</Panel>
      )}
      {role === Roles.Tutor && <Panel className={styles.panel}>Наименование олимпиады</Panel>}
      {homeworks.map(homework => (
        <Homework className={styles.homework} key={Math.random()} {...homework} />
      ))}
    </div>
  );
};

export default Homeworks;
