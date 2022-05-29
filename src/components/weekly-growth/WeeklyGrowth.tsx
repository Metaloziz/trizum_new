import classNames from 'classnames';
import { FC } from 'react';
import { WeeklyGrowthProps } from '@app/types/ComponentsProps';
import SkillGrow from './skill-grow/SkillGrow';
import styles from './WeeklyGrowth.module.scss';

const WeeklyGrowth: FC<WeeklyGrowthProps> = ({ weeklyGrowth, className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <span className={styles.title}>Рост за неделю</span>
      <div className={styles.itemsContainer}>
        {weeklyGrowth.map((weeklyGrowth) => (
          <SkillGrow key={Math.random()} {...weeklyGrowth}></SkillGrow>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGrowth;
