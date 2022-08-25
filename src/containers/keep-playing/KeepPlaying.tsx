import { FC } from 'react';

import classNames from 'classnames';

import styles from './KeepPlaying.module.scss';

import { KeepPlayingProps } from 'app/types/ComponentsProps';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';

const KeepPlaying: FC<KeepPlayingProps> = ({ className, games }) => {
  const navigate = useNavigate();

  const setRout = () => {
    navigate(`${AppRoutes.Game}`);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Осталось времени</div>
      {games.map(game => (
        <KeepPlayingItem key={Math.random()} {...game} onClick={setRout} />
      ))}
    </div>
  );
};

export default KeepPlaying;
