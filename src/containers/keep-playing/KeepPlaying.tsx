import classNames from 'classnames';
import { FC } from 'react';
import { KeepPlayingProps } from '@app/components/ComponentsProps';
import KeepPlayingItem from '@components/keep-playing-item/KeepPlayingItem';
import styles from './KeepPlaying.module.scss';

const KeepPlaying: FC<KeepPlayingProps> = ({ className, games }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Осталось времени</div>
      {games.map((game) => (
        <KeepPlayingItem key={game.id} {...game} />
      ))}
    </div>
  );
};

export default KeepPlaying;
