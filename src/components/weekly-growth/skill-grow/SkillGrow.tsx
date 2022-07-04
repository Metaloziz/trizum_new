import { FC } from 'react';

import classNames from 'classnames';

import styles from './SkillGrow.module.scss';

import { SkillGrowProps } from 'app/types/ComponentsProps';

const SkillGrow: FC<SkillGrowProps> = ({ skillTitle, color, percents }) => {
  const indicatorStyle = {
    height: `${1.8 * percents}px`,
  };

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <div className={classNames(styles.indicator, styles[color])} style={indicatorStyle} />
      <span className={styles.percents}>{`${percents}%`}</span>
      <span className={styles.skillTitle}>{skillTitle}</span>
    </div>
  );
};

export default SkillGrow;
