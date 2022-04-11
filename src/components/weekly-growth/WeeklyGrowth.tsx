/* eslint-disable prettier/prettier */
import { FC } from 'react';
import SkillGrow from './skill-grow/SkillGrow';
import styles from './WeeklyGrowth.module.scss';

type Props = {
  weeklyGrowth: {
    title: string;
    color: 'red' | 'violet' | 'yellow' | 'aquamarine';
    percents: number;
    id: number;
  }[];
};

const WeeklyGrowth: FC<Props> = ({ weeklyGrowth }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Рост за неделю</span>
      <div className={styles.itemsContainer}>
        {weeklyGrowth &&
          weeklyGrowth.map(({ title, color, percents, id }) => (
            <SkillGrow key={id} className={styles.item} percents={percents} color={color} title={title}></SkillGrow>
          ))}
      </div>
    </div>
  );
};

export default WeeklyGrowth;
