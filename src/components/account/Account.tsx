import { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './Account.module.scss';

import tokenService from 'app/services/tokenService';
import appStore, { Roles } from 'app/stores/appStore';
import avatar from 'assets/images/avatar.png';
import { DropDownStudents } from 'components/drop-down-student/DropDownStudents';
import Image from 'components/image/Image';

const Account: FC = observer(() => {
  const { user, setRole } = appStore;

  const [isOpenChangeStudentModal, setIsOpenChangeStudentModal] = useState<boolean>(false);

  const toggleChangeStudentModal = () => {
    user.canSwitchTo.length > 0 && setIsOpenChangeStudentModal(!isOpenChangeStudentModal);
  };

  // const { Signout } = Routes;
  const activeNotification = true;

  const logout = async () => {
    await tokenService.removeUser();
    setRole(Roles.Unauthorized);
    // logOutUser();
    // console.log(user);
    // router.push(Routes.Index);
  };

  const onChangeStudent = useCallback(async (id: string) => {
    try {
      await appStore.switchUser({ id });
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return (
    <div className={styles.container}>
      <button onClick={toggleChangeStudentModal} className={styles.avatar}>
        <Image src={avatar} width={53} height={53} alt="user avatar" />
        <div className={styles.notification} />
        {isOpenChangeStudentModal && (
          <DropDownStudents
            avatar={avatar}
            canSwitchTo={user.canSwitchTo}
            onChangeStudent={onChangeStudent}
          />
        )}
      </button>
      <span className={styles.span}>{appStore.role}</span>
      <button className={styles.logout} onClick={logout}>
        Выйти из аккаунта
      </button>
    </div>
  );
});

export default Account;
