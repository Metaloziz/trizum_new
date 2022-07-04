import { useState } from 'react';

import styles from './PagePersonalData.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import setting from 'public/svgs/settings.svg';
import user from 'public/svgs/user.svg';

const PagePersonalData = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.wrapperUser}>
          <div className={styles.userPic}>
            <Image src={user} width="126" height="126" alt="user" />
          </div>
          <div className={styles.userSetting} onClick={() => setShowModal(true)}>
            <Image src={setting} width="25" height="25" alt="settings" />
          </div>
        </div>
      </div>
      <div className={styles.userData}>
        <h2>Днепровский Александр Алексеевич</h2>
        <form>
          <div>
            <label>Телефон:</label>
            <input />
          </div>
          <div>
            <label>Почта:</label>
            <input />
          </div>
          <div className={styles.buttonWrapper}>
            <Button>Сохранить</Button>
          </div>
        </form>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.wrapContent}>
          <div>
            <p>Ваш телефон</p>
            <span>+7 (999) 444 44 44</span>
          </div>
          <div>
            <p>Временный код</p>
            <input type="text" placeholder="4 _ _ _" />
          </div>
          <div>
            <Button>Подтвердить изменения</Button>
            <p>Отправить повторно</p>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default PagePersonalData;
