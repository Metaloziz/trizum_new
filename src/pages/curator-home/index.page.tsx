import { useState } from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {
  colNamesCurator,
  listCurator,
} from '@components/moks-data/moks-data-curator';
import Pagination from '@components/pagination/Pagination';
import Table from '@components/table/Table';
import styles from './CuratorHome.module.scss';

const IndexPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.content}>
      <div className={styles.wrapStaticBlock}>
        <div className={styles.bigButton}>
          <CustomButton
            type={'bigButton'}
            size={'large'}
            onClick={() => setShowModal(true)}
          >
            Добавить
          </CustomButton>
        </div>
        <div className={styles.infoContent}>
          <InformationItem title={'Полное наименование'} variant={'input'} />
          <InformationItem title={'Короткое наименование'} variant={'input'} />
          <InformationItem title={'ИНН'} variant={'input'} />
        </div>
        <div className={styles.infoContent}>
          <InformationItem title={'Телефон'} variant={'input'} />
          <InformationItem title={'E-mail'} variant={'input'} />
          <InformationItem title={'Город'} variant={'input'} />
        </div>
        <div className={styles.findBtn}>
          <InformationItem title={'Номер счёта'} variant={'input'} />
          <div className={styles.btnText}>
            <CustomButton>Найти</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        <Table list={listCurator} colNames={colNamesCurator} />
      </div>
      <div className={styles.paginationCuratorBlock}>
        <Pagination initialPage={1} pageCount={30} />
      </div>
      <div className={styles.modalContent}>
        <BasicModal visibility={showModal} changeVisibility={setShowModal}>
          <div className={styles.modalWrap}>
            <div className={styles.modalContent}>
              <div>
                <InformationItem
                  title={'Полное наименование'}
                  variant={'input'}
                />
                <InformationItem
                  title={'Короткое наименование'}
                  variant={'input'}
                />
                <InformationItem title={'ИНН'} variant={'input'} />
                <InformationItem title={'Юр. адрес'} variant={'input'} />
                <InformationItem
                  title={'Фактический адрес'}
                  variant={'input'}
                />
                <InformationItem
                  title={'Наименование школы'}
                  variant={'input'}
                />
                <InformationItem title={'ОГРН'} variant={'input'} />
                <InformationItem title={'КПП'} variant={'input'} />
                <InformationItem title={'Расчётный счёт'} variant={'input'} />
              </div>
              <div>
                <InformationItem title={'Телефон'} variant={'input'} />
                <InformationItem title={'E-mail'} variant={'input'} />
                <InformationItem title={'Город'} variant={'input'} />
                <InformationItem title={'КПП'} variant={'input'} />
                <InformationItem title={'Корр. счёт банка'} variant={'input'} />
                <InformationItem title={'БИК банка'} variant={'input'} />
                <InformationItem title={'ИНН банка'} variant={'input'} />
                <InformationItem title={'КПП банка'} variant={'input'} />
              </div>
            </div>
            <div className={styles.btnBlock}>
              <CustomButton>Сохранить</CustomButton>
            </div>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

export default IndexPage;
