import React, { FC } from 'react';

import iconSettingsBlue from 'assets/svgs/icon-setting-blue.svg';
import iconSettings from 'assets/svgs/icon-settings.svg';
import styles from 'components/card-student/card-student-extended/CardStudentExtended.module.scss';
import Image from 'components/image/Image';

type EditUserIconT = {
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
  show: boolean;
};

export const EditUserIcon: FC<EditUserIconT> = ({ show, onMouseOut, onMouseOver, onClick }) => (
  <div
    className={styles.settings}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onClick={onClick}
  >
    {show ? (
      <Image src={iconSettingsBlue} width="30" height="30" alt="Settings" />
    ) : (
      <Image src={iconSettings} width="30" height="30" alt="Settings" />
    )}
  </div>
);
