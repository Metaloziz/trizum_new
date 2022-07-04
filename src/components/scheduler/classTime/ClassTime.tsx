import React, { FC } from 'react';

import styles from './ClassTime.module.scss';

interface Props {
  time: string[];
}

export const ClassTime: FC<Props> = ({ time }) => (
  <td className={styles.time}>
    {time[0] ? <span>{time[0]}</span> : <span />}
    {/* <span>{time[0] ? time[0] : ''}</span> */}
    <span>{time[1]}</span>
    <span />
  </td>
);
