import Image from 'next/image';
import React, { useState } from 'react';
import settingsGamesHover from '@svgs/settings-game-hover.svg';
import settingsGames from '@svgs/settings-game.svg';
import styles from './SettingsGames.module.scss';

const SettingsGames = () => {
  const [isShowHover, setShowHover] = useState(false);

  return (
    <div
      className={styles.settings}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      <Image
        src={isShowHover ? settingsGamesHover : settingsGames}
        alt={'setting'}
        width={'16'}
        height={'16'}
      />
    </div>
  );
};

export default SettingsGames;
