import { FC, useState } from 'react';

import play from '../../../../../../assets/svgs/play.svg';
import cn from 'classnames';
import styles from './StatisticsItem.module.scss';
import CustomDoughnut from 'components/olympiad-page/components/custom-doughnut/custom-doughnut/CustomDoughnut';
import ProgressLine from 'components/olympiad-page/components/progress-line/ProgressLine';
import Image from 'components/image/Image';

export enum colorThemeStatistic {
  aquamarine = 'aquamarine',
  gradientViolet = 'gradientViolet',
  gradientBlueDarker = 'gradientBlueDarker',
  blue = 'blue',
}

export interface StatisticsItemProps {
  id: number;
  itemTitle: string;
  minutesLeft: number;
  minutesTotal: number;
  percentCompleted: number;
  colorTheme: colorThemeStatistic;
}

const barData = [
  { title: 'Количество верных ответов', completed: 70 },
  { title: 'Общее количество нажатий', completed: 100 },
];

const barDataNew = [
  { title: 'Скорость нажатия', completed: 50 },
  { title: 'Название шаблона', completed: 80 },
];

const StatisticsItem: FC<StatisticsItemProps> = ({
  itemTitle,
  minutesLeft,
  colorTheme,
  percentCompleted,
  minutesTotal,
  id,
}) => {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!isShow);
  };

  return (
    <div>
      <div className={cn(styles.container, styles[colorTheme], isShow && styles.activeShow)}>
        <button type="button" onClick={toggleShow}>
          <Image src={play} alt="play" />
        </button>
        <span className={styles.title}>{itemTitle}</span>
        <span className={styles.minutesLeft}>
          {`${minutesLeft} / `}
          <span>{minutesTotal}</span>
          <span>минут</span>
        </span>
      </div>
      {isShow && (
        <div className={styles.bottomBlock}>
          <div>
            <CustomDoughnut color={colorTheme} percent={percentCompleted} />
          </div>
          <div>
            {barData.map(({ title, completed }) => (
              <ProgressLine
                key={title}
                title={title}
                colorTheme={colorTheme}
                completed={completed}
              />
            ))}
          </div>
          <div>
            {barDataNew.map(({ title, completed }) => (
              <ProgressLine
                key={title}
                title={title}
                colorTheme={colorTheme}
                completed={completed}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsItem;
