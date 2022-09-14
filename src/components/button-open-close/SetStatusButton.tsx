import { FC, useState } from 'react';

import cn from 'classnames';

import styles from './ButtonOpenClose.module.scss';

import usersService from 'app/services/usersService';
import { ResponseUserT, UserStatusT } from 'app/types/UserTypes';
import iconClosed from 'assets/svgs/closed-lock.svg';
import iconOpen from 'assets/svgs/open-lock.svg';
import Image from 'components/image/Image';
import usersStore from 'app/stores/usersStore';

type Props = Pick<ResponseUserT, 'status' | 'id'>;

const SetStatusButton: FC<Props> = ({ status, id }) => {
  const [isActive, setIsActive] = useState<boolean>(status);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const setNewStatus = async () => {
    setIsDisable(true);

    try {
      setIsActive(!isActive);
      const res = await usersStore.updateUser({ isActive: !isActive }, id);
      setIsDisable(false);
    } catch (e) {
      setIsDisable(false);
    }
  };

  const iconButton = isActive ? (
    <Image src={iconClosed} alt="lock" width={16} height={20} />
  ) : (
    <Image src={iconOpen} alt="open" width={16} height={20} />
  );
  return (
    <button
      type="button"
      className={cn(styles.Button, isActive && styles.closed, isDisable && styles.disable)}
      onClick={setNewStatus}
      disabled={isDisable}
    >
      <span className={styles.icon}>{iconButton}</span>
      {isActive ? 'Заблокировать' : 'Разблокировать'}
    </button>
  );
};

export default SetStatusButton;
