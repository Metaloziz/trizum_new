import React, { FC, useState } from 'react';

import styles from './SettingsGames.module.scss';

import settingsGamesHover from 'assets/svgs/settings-game-hover.svg';
import settingsGames from 'assets/svgs/settings-game.svg';
import Image from 'components/image/Image';

type Props = {
  onClick?: () => void;
};

const SettingsGames: FC<Props> = props => {
  const { onClick } = props;
  const [isShowHover, setShowHover] = useState(false);

  return (
    <div
      className={styles.settings}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
      onClick={onClick}
    >
      <Image
        src={isShowHover ? settingsGamesHover : settingsGames}
        alt="setting"
        width="16"
        height="16"
      />
    </div>
  );
};

export default SettingsGames;
