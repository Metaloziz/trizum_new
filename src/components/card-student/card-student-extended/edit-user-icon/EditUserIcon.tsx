import React, { FC } from 'react';

import iconSettingsBlue from 'assets/svgs/icon-setting-blue.svg';
import styles from 'components/card-student/card-student-extended/CardStudentExtended.module.scss';

type EditUserIconT = {
  onClick: () => void;
};

export const EditUserIcon: FC<EditUserIconT> = ({ onClick }) => (
  <div className={styles.settings} onClick={onClick}>
    <img src={iconSettingsBlue} width={30} height={30} alt="setting" />
  </div>
);
