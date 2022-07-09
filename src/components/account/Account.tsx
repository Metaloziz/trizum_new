import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './Account.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import tokenService from 'app/services/tokenService';
import appStore, { Roles } from 'app/stores/appStore';
import avatar from 'assets/images/avatar.png';
import Image from 'components/image/Image';

const Account: FC = observer(() => {
  // const { Signout } = Routes;
  const activeNotification = true;
  const { setRole } = appStore;
  const logout = async () => {
    await tokenService.removeUser();
    setRole(Roles.Unauthorized);
    // router.push(Routes.Index);
  };
  return (
    <div className={styles.container}>
      <button className={styles.avatar}>
        <Image src={avatar} width={53} height={53} alt="avatar" />
        <div className={styles.notification} />
      </button>
      <span className={styles.span}>{appStore.role}</span>
      <button className={styles.logout} onClick={logout}>
        Выйти из аккаунта
      </button>
    </div>
  );
});

export default Account;
