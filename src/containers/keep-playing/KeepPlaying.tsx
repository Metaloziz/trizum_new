import { FC } from 'react';

import classNames from 'classnames';

import styles from './KeepPlaying.module.scss';

import { KeepPlayingProps } from 'app/types/ComponentsProps';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';

const KeepPlaying: FC<KeepPlayingProps> = ({ className, games }) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.title}>Осталось времени</div>
    {games.map(game => (
      <KeepPlayingItem key={Math.random()} {...game} />
    ))}
  </div>
);

export default KeepPlaying;
