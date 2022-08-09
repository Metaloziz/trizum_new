import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './drop-down-student.module.scss';

import { canSwitchToT } from 'app/types/UserTypes';

type DropDownStudentsT = {
  avatar: string;
  canSwitchTo: canSwitchToT[];
  onClick?: () => void;
  onChangeStudent: (id: string) => void;
};

export const DropDownStudents: FC<DropDownStudentsT> = observer(props => {
  const { avatar, canSwitchTo, onChangeStudent } = props;

  return (
    <div className={styles.container}>
      {canSwitchTo.map(el => (
        <div key={el.id} className={styles.student} onClick={() => onChangeStudent(el.id)}>
          <img src={el.avatar || avatar} alt="user avatar" />
          <span>
            {`${el.lastName} ${el.firstName.substring(0, 1)} ${el.middleName.substring(0, 1)}`}
          </span>
        </div>
      ))}
    </div>
  );
});
