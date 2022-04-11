import classNames from 'classnames';
import { FC } from 'react';
import styles from './SkillGrow.module.scss';

type Props = {
  title: string;
  className: string;
  color: 'red' | 'violet' | 'yellow' | 'aquamarine';
  percents: number;
};

const SkillGrow: FC<Props> = ({ title, className, color, percents }) => {
  const indicatorStyle = {
    height: `${1.8 * percents}px`,
  };

  return (
    <div className={styles.container}>
      <div className={classNames(className, styles.indicator, styles[color])} style={indicatorStyle}></div>
      <span className={styles.percents}>{`${percents}%`}</span>
      <span className={styles.name}>{title}</span>
    </div>
  );
};

export default SkillGrow;
