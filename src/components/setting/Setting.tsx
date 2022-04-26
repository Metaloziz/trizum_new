import Image from 'next/image';
import React, { useState } from 'react';
import settingsHover from '@svgs/settings-hover.svg';
import settings from '@svgs/settings.svg';
import styles from './Setting.module.scss';

const Setting = () => {
  const [isShowHover, setShowHover] = useState(false);

  return (
    <div onMouseOver={() => setShowHover(true)} onMouseOut={() => setShowHover(false)}>
      <div>
        <Image src={isShowHover ? settingsHover : settings} alt={'setting'} width={'25'} height={'25'} />
      </div>
    </div>
  );
};

export default Setting;
