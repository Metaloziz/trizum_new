import classNames from 'classnames';
import { FC } from 'react';
import { HomeworkProps } from '@app/components/ComponentsProps';
import styles from './Homework.module.scss';

const Homework: FC<HomeworkProps> = ({
  gameTitle,
  description: { needToDo, minutesLeft, tips },
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={classNames('h3', styles.gameTitle)}>{gameTitle}</h3>
      <div className={styles.description}>
        <p
          className={`${styles.minutesLeft} p-smaller`}
        >{`У вас есть ${minutesLeft} минут на выполнение задания`}</p>
        <div className={styles.needToDoContainer}>
          <em className={`${styles.needToDoTitle} em`}>Необходимо:</em>
          <p className={styles.needToDoText}>{needToDo}</p>
        </div>
        <p className={`${styles.tipsTitle} p-smaller`}>Подсказки</p>
        <ul className={`${styles.tips} p-smaller`}>
          {tips.map(({ text, id }) => (
            <li key={id} className={styles.tip}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homework;
