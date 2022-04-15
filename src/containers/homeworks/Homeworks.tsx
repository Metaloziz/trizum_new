import classNames from 'classnames';
import { FC } from 'react';
import { HomeworksProps } from '@app/components/ComponentsProps';
import Homework from '@components/homework/Homework';
import Panel from '@components/panel/Panel';
import styles from './Homeworks.module.scss';

const Homeworks: FC<HomeworksProps> = ({ homeworks, className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Panel className={styles.panel}>Домашнее задание на 7 октября 2021</Panel>
      {homeworks.map((homework) => (
        <Homework className={styles.homework} key={homework.id} {...homework} />
      ))}
    </div>
  );
};

export default Homeworks;
