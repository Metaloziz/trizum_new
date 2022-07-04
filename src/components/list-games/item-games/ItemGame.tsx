import { FC } from 'react';

import styles from './ItemGames.module.scss';

import ButtonPlay from 'components/button-play/ButtonPlay';
import SettingsGames from 'components/settings-games/SettingsGames';

interface Props {
  title?: string;
  imgSrc?: string;
  onClick?: () => void;
}

const ItemGame: FC<Props> = ({ title, imgSrc, onClick }) => {
  const onPlay = () => {
    onClick && onClick();
  };
  return (
    <div className={styles.content}>
      <div className={styles.titleBlock}>
        <h1>{title}</h1>
        <SettingsGames />
      </div>
      <div className={styles.imageTable}>
        <img src={imgSrc} alt="games" />
      </div>
      <ButtonPlay onClick={onPlay} title="Играть" />
    </div>
  );
};

export default ItemGame;
