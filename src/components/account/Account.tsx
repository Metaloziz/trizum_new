import { FC } from 'react';

import tokenService from '@app/services/tokenService';
import appStore, { Roles } from '@app/stores/appStore';
import { Routes } from '@constants/Routes';
import avatar from '@images/avatar.png';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Account.module.scss';

const Account: FC = observer(() => {
  // const { Signout } = Routes;
  const activeNotification = true;
  const { setRole } = appStore;
  const logout = async () => {
    await tokenService.removeUser();
    setRole(Roles.Unauthorized);
  };
  return (
    <div className={styles.container}>
      <button className={styles.avatar}>
        <Image src={avatar} width={53} height={53} alt="avatar" />
        <div className={styles.notification} />
      </button>
      <span className={styles.abs}>{appStore.role}</span>
      <button className={styles.logout} onClick={logout}>
        Выйти из аккаунта
      </button>
    </div>
  );
});

export default Account;
