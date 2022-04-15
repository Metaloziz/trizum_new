import classNames from 'classnames';
import { FC } from 'react';
import { SkillGrowProps } from '@app/types/ComponentsProps';
import styles from './SkillGrow.module.scss';

const SkillGrow: FC<SkillGrowProps> = ({ skillTitle, color, percents }) => {
  const indicatorStyle = {
    height: `${1.8 * percents}px`,
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.indicator, styles[color])}
        style={indicatorStyle}
      ></div>
      <span className={styles.percents}>{`${percents}%`}</span>
      <span className={styles.skillTitle}>{skillTitle}</span>
    </div>
  );
};

export default SkillGrow;
