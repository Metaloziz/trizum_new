import classNames from 'classnames';
import Image from 'next/image';
import styles from './Account.module.scss';
import avatar from '../../../public/assets/images/avatar.png';

const Account = () => {
  const activeNotification = true;

  return (
    <div className={styles.container}>
      <div className={classNames(styles.avatar, { [styles.activeNotification]: activeNotification })}>
        <Image src={avatar} width={53} height={53} alt="avatar" />
        <div className={styles.notification}></div>
      </div>
      <button className={styles.logout}>Выйти из аккаунта</button>
    </div>
  );
};

export default Account;
