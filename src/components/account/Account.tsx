import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Routes } from '@constants/Routes';
import avatar from '@images/avatar.png';
import styles from './Account.module.scss';

const Account: FC = () => {
  const { Signout } = Routes;
  const activeNotification = true;

  return (
    <div className={styles.container}>
      <button
        className={classNames(styles.avatar, {
          [styles.activeNotification]: activeNotification,
        })}
      >
        <Image src={avatar} width={53} height={53} alt="avatar" />
        <div className={styles.notification}></div>
      </button>

      <button className={styles.logout}>
        <Link href={Signout}>Выйти из аккаунта</Link>
      </button>
    </div>
  );
};

export default Account;
