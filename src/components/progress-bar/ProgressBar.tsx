import { FC } from 'react';

import cn from 'classnames';

import styles from './ProgressBar.module.scss';

interface Props {
  bgColor: string;
  completed: number;
  className?: string;
  title: string;
}

const ProgressBar: FC<Props> = ({ bgColor, completed, className, title }) => (
  <div>
    <div className={styles.labelStyles}>
      <span>{`${completed}%`}</span>
      <p>{title}</p>
    </div>
    <div className={cn(className, styles.containerStyles)}>
      <div
        className={styles.fillerStyles}
        style={{ width: `${completed}%`, backgroundColor: bgColor }}
      />
    </div>
  </div>
);

ProgressBar.defaultProps = {
  className: '',
};

export default ProgressBar;
