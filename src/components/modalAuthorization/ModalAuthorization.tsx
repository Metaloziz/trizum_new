import { useState } from 'react';

import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';

import styles from './ModalAuthorization.module.scss';

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
          <CustomButton>Подтвердить изменения</CustomButton>
          <div>
            <p>Забыли пароль?</p>
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default ModalAuthorization;
