import React, { useEffect, useMemo, useState } from 'react';

import { observer } from 'mobx-react';

import styles from './FranchisingPage.module.scss';

import { FranchiseStore } from 'app/stores/franchiseStore';
import Button from 'components/button/Button';
import FranchisingModal from 'components/franchising-page/franchising-modal/FranchisingModal';
import InformationItem from 'components/information-item/InformationItem';
import {
  city,
  colNamesCurator,
  listCurator,
  listCuratorType,
} from 'components/moks-data/moks-data-curator';
import Pagination from 'components/molecules/Pagination';
import Table from 'components/table/Table';

const FranchisingPage = observer(() => {
  const store = useMemo(() => new FranchiseStore(), []);

  // const { franchises, getAllFranchise } = franchiseStore;
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [mask, setMask] = useState('+7');
  // const [showModal, setShowModal] = useState<boolean>(false);

  // #region move to store
  const [data, setData] = useState<listCuratorType[]>(listCurator); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(5); // State для отображения количества элементов на каждой странице

  const lastItemIndex = currentPage * count;
  const firstItemIndex = lastItemIndex - count;
  const currentItem = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentItem.length === count) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  // endregion

  useEffect(() => {
    store.pull();
  }, []);

  if (store.loading) {
    return <div>Получение данных</div>;
  }

  return (
    <div className={styles.contentBlock}>
      <div className={styles.wrapStaticBlock}>
        <div className={styles.bigButton}>
          <Button type="bigButton" size="large" onClick={store.openDialog}>
            Добавить
          </Button>
        </div>
        <div className={styles.infoContent}>
          <InformationItem title="Полное наименование" variant="input" />
          <InformationItem title="Короткое наименование" variant="input" />
          <InformationItem title="ИНН" variant="inn" />
        </div>
        <div className={styles.infoContent}>
          <InformationItem title="Телефон" variant="phone" />
          <InformationItem title="E-mail" variant="input" />
          <InformationItem title="Город" variant="select" placeholder="Москва" option={city} />
        </div>
        <div className={styles.findBtn}>
          <InformationItem title="Номер счёта" variant="input" />
          <div className={styles.btnText}>
            <Button>Найти</Button>
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        <Table list={currentItem} colNames={colNamesCurator} loading={loading}>
          {store.entities.length ? (
            store.entities.map((item, idx) => (
              <tr key={item.id}>
                <td>{`${item.fullName || ''} ${item.shortName}`}</td>
                <td>{item.city || '-'}</td>
                <td>{item.legalAddress || '-'}</td>
                <td>{item.phone ? `${item.phone} ${item.email}` : '-'}</td>
                <td>{item.ogrn ? `${item.ogrn} ${item.inn} ${item.kpp}` : '-'}</td>
                <td>{item.checkingAccount || '-'}</td>
                <td>{item.bankBill || '-'}</td>
                <td>{item.bankName || '-'}</td>
                <td>{item.bankBik ? `${item.bankBik} ${item.bankInn} ${item.bankKpp}` : '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>Данные отсутствуют...</td>
            </tr>
          )}
        </Table>
      </div>
      <div className={styles.paginationCuratorBlock}>
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          pageSize={listCurator.length}
          onPageChange={paginate}
        />
      </div>
      <div className={styles.modalContent}>
        <FranchisingModal showModal={store.isDialogOpen} onClose={store.closeDialog} />
      </div>
    </div>
  );
});

export default FranchisingPage;
