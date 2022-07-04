import { useState } from 'react';

import styles from './ModalAuthorization.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';

const ModalAuthorization = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <BasicModal visibility={showModal} changeVisibility={setShowModal}>
      <div className={styles.wrapContent}>
        <div>
          <h1>Авторизация</h1>
        </div>
        <div className={styles.modalInput}>
          <p>Ваш номер телефона</p>
          <InformationItem variant="phone" />
        </div>
        <div>
          <Button>Подтвердить изменения</Button>
          <div>
            <p>Забыли пароль?</p>
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default ModalAuthorization;
