import React, { FC, useState } from 'react';

import franchiseService from '@app/services/franchiseService';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import styles from '@components/franchising-page/FranchisingPage.module.scss';
import InformationItem from '@components/information-item/InformationItem';

type Props = {
  showModal: boolean;
  setShowModal: () => void;
};

const FranchisingModal: FC<Props> = props => {
  const { showModal, setShowModal } = props;
  const [shortName, setShortName] = useState('');
  const onSaveClick = async () => {
    try {
      const res = await franchiseService.create({ shortName });
      setShowModal();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BasicModal visibility={showModal} changeVisibility={setShowModal}>
      <div className={styles.modalWrap}>
        <div className={styles.modalContent}>
          <div>
            <InformationItem title="Полное наименование" variant="input" />
            <InformationItem
              title="Короткое наименование"
              variant="input"
              value={shortName}
              onChange={setShortName}
            />
            <InformationItem title="ИНН" variant="input" />
            <InformationItem title="Юр. адрес" variant="input" />
            <InformationItem title="Фактический адрес" variant="input" />
            <InformationItem title="Наименование школы" variant="input" />
            <InformationItem title="ОГРН" variant="input" />
            <InformationItem title="КПП" variant="input" />
            <InformationItem title="Расчётный счёт" variant="input" />
          </div>
          <div>
            <InformationItem title="Телефон" variant="input" />
            <InformationItem title="E-mail" variant="input" />
            <InformationItem title="Город" variant="input" />
            <InformationItem title="КПП" variant="input" />
            <InformationItem title="Корр. счёт банка" variant="input" />
            <InformationItem title="БИК банка" variant="input" />
            <InformationItem title="ИНН банка" variant="input" />
            <InformationItem title="КПП банка" variant="input" />
          </div>
        </div>
        <div className={styles.btnBlock}>
          <div className={styles.deleteBtn}>
            <CustomButton onClick={() => console.log('Сохранить')}>Удалить</CustomButton>
          </div>
          <CustomButton onClick={onSaveClick}>Сохранить</CustomButton>
        </div>
      </div>
    </BasicModal>
  );
};

export default FranchisingModal;
