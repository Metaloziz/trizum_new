import { FC, useState } from 'react';

import styles from './UserPage.module.scss';

import appStore from 'app/stores/appStore';
import gag from 'assets/svgs/user.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import InformationItem from 'components/information-item/InformationItem';
import Setting from 'components/setting/Setting';

interface Props {
  id?: string;
}

const UserPage: FC<Props> = ({ id }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user } = appStore;
  const fake = () => {};
  console.log('hhhh', user?.avatar);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.wrapperUser}>
          <div className={styles.userPic}>
            {user?.avatar !== null ? (
              <Image
                className={styles.avatarImage}
                src={`https://backschool.sitetopic.ru${user?.avatar?.path}`}
                width="320"
                height="320"
                alt="user"
              />
            ) : (
              <Image src={gag} width="126" height="126" alt="user" />
            )}
          </div>
          <div className={styles.userSetting}>
            {/* <div className={styles.userSetting} onClick={() => setShowModal(true)}> */}

            <Setting />
          </div>
        </div>
      </div>
      <div className={styles.userData}>
        <h2>{`${user.firstName} ${user.middleName} ${user.lastName}`}</h2>
        <div className={styles.labelBlock}>
          <label htmlFor={id}>Телефон:</label>
          <InformationItem id={id} variant="input" onChange={fake} />
        </div>
        <div className={styles.labelBlock}>
          <label htmlFor={id}>Почта:</label>
          <InformationItem id={id} variant="input" onChange={fake} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button>Сохранить</Button>
        </div>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.wrapContent}>
          <div>
            <p>Ваш телефон</p>
            <span>+7 (965) 555 32 32</span>
          </div>
          <div className={styles.modalInput}>
            <p>Временный код</p>
            <InformationItem id={id} variant="input" placeholder="4 _ _ _ " />
          </div>
          <div>
            <Button>Подтвердить изменения</Button>
            <div>
              <p className={styles.underlined}>Отправить повторно</p>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

UserPage.defaultProps = {
  id: '',
};

export default UserPage;
