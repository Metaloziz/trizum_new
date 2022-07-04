import { FC, useState } from 'react';

import cn from 'classnames';

import styles from './ChoiceInfoItem.module.scss';

import { KeepPlayingItemProps } from 'app/types/ComponentsProps';
import play from 'assets/svgs/play.svg';
import DoughnutNew from 'components/doughnut-new/DoughnutNew';
import Image from 'components/image/Image';
import ProgressBar from 'components/progress-bar/ProgressBar';

const barData = [
  { title: 'Количество верных ответов', bgColor: '#4FC1D6', completed: 70 },
  { title: 'Общее количество нажатий', bgColor: '#4FC1D6', completed: 100 },
];

const barDataNew = [
  { title: 'Скорость нажатия', bgColor: '#4FC1D6', completed: 50 },
  { title: 'Название шаблона', bgColor: '#4FC1D6', completed: 80 },
];

const ChoiceInfoItem: FC<KeepPlayingItemProps> = ({ title, minutesLeft, colorTheme }) => {
  const [isShow, setShow] = useState(false);
  const toggleShow = () => setShow(!isShow);
  return (
    <div>
      {/* @ts-ignore */}
      <div className={cn(styles.container, styles[colorTheme], isShow && styles.activeShow)}>
        <button onClick={toggleShow}>
          <Image src={play} alt="play" />
        </button>
        <span className={styles.title}>{title}</span>
        <span className={styles.minutesLeft}>
          {`${minutesLeft} / `}
          <span>50</span>
          <span>минут</span>
        </span>
      </div>
      {isShow && (
        <div className={styles.bottomBlock}>
          <div>
            <DoughnutNew />
          </div>
          <div>
            {barData.map((item, ind) => (
              <ProgressBar
                key={ind}
                title={item.title}
                bgColor={item.bgColor}
                completed={item.completed}
              />
            ))}
          </div>
          <div>
            {barDataNew.map((item, ind) => (
              <ProgressBar
                key={ind}
                title={item.title}
                bgColor={item.bgColor}
                completed={item.completed}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoiceInfoItem;
