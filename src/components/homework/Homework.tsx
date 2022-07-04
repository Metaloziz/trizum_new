import { FC } from 'react';

import classNames from 'classnames';

import styles from './Homework.module.scss';

import { HomeworkProps } from 'app/types/ComponentsProps';

const Homework: FC<HomeworkProps> = ({
  gameTitle,
  description: { needToDo, minutesLeft, tips },
  className,
}) => (
  <div className={classNames(styles.container, className)}>
    <h3 className={classNames('h3', styles.gameTitle)}>{gameTitle}</h3>
    <div className={styles.description}>
      <p
        className={`${styles.minutesLeft} p-smaller`}
      >{`У вас есть ${minutesLeft} минут на выполнение задания`}</p>
      <div className={styles.needToDoContainer}>
        <em className={`${styles.needToDoTitle} em`}>Необходимо:</em>
        <p>{needToDo}</p>
      </div>
      <p className={`${styles.tipsTitle} p-smaller`}>Подсказки</p>
      <ul className={`${styles.tips} p-smaller`}>
        {tips.map(({ text, id }) => (
          <li key={Math.random()} className={styles.tip}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Homework;
