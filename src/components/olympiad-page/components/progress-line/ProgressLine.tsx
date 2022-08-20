import { FC } from 'react';

import style from './ProgressLine.module.scss';

import cn from 'classnames';
import { colorThemeStatistic } from '../statistics-list/statistics-list/statistics-item/StatisticsItem';
import { colorThemeDoughnut } from 'constants/ColorThemeDoughnut';

type ProgressLineProps = {
  colorTheme: colorThemeStatistic;
  completed: number;
  className?: string;
  title: string;
};

const ProgressLine: FC<ProgressLineProps> = ({ colorTheme, completed, className, title }) => (
  <div>
    <div className={cn(style.labelStyles, style[colorTheme])}>
      <span className={style.percent}>{`${completed}%`}</span>
      <p>{title}</p>
    </div>
    <div className={cn(className, style.containerStyles)}>
      <div
        className={style.fillerStyles}
        style={{ width: `${completed}%`, backgroundColor: colorThemeDoughnut[colorTheme] }}
      />
    </div>
  </div>
);

export default ProgressLine;
