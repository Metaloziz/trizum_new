import classNames from 'classnames';
import { FC } from 'react';
import { KeepPlayingItemProps } from '@app/components/ComponentsProps';
import ButtonPlay from '@components/button-play/ButtonPlay';
import styles from './KeepPlayingItem.module.scss';

const KeepPlayingItem: FC<KeepPlayingItemProps> = ({
  title,
  minutesLeft,
  colorTheme,
}) => {
  return (
    <div className={classNames(styles.container, styles[colorTheme])}>
      <span className={styles.title}>{title}</span>
      <ButtonPlay size="small" className={styles.button} />
      <span className={styles.minutesLeft}>
        {`${minutesLeft} / `}
        <span>50</span>
        <span>минут</span>
      </span>
    </div>
  );
};

export default KeepPlayingItem;
