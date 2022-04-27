import Image from 'next/image';
import { FC, useState } from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import Setting from '@components/setting/Setting';
import user from '@svgs/user.svg';
import styles from './PagePersonalData.module.scss';

const IndexPage: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.wrapperUser}>
          <div className={styles.userPic}>
            <Image src={user} width="126" height="126" alt="user" />
          </div>
          <div
            className={styles.userSetting}
            onClick={() => setShowModal(true)}
          >
            <Setting />
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
            <CustomButton>Сохранить</CustomButton>
          </div>
        </form>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.wrapContent}>
          <div>
            <p>Ваш телефон</p>
            <span>+7 (965) 555 32 32</span>
          </div>
          <div>
            <p>Временный код</p>
            <input type="text" placeholder="4 _ _ _ " />
          </div>
          <div>
            <CustomButton>Подтвердить изменения</CustomButton>
            <div>
              <a>Отправить повторно</a>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default IndexPage;
