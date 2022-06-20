import { useEffect, useState } from 'react';

import franchiseStore from '@app/stores/franchiseStore';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import CustomPagination from '@components/custom-pagination/CustomPagination';
import FranchisingModal from '@components/franchising-page/franchising-modal/FranchisingModal';
import InformationItem from '@components/information-item/InformationItem';
import {
  colNamesCurator,
  listCuratorType,
  listCurator,
  city,
} from '@components/moks-data/moks-data-curator';
import Table from '@components/table/Table';
import { observer } from 'mobx-react-lite';

import styles from './FranchisingPage.module.scss';

const FranchisingPage = observer(() => {
  const { franchises, getAllFranchise } = franchiseStore;
  const [isLoaded, setIsLoaded] = useState(false);
  const [mask, setMask] = useState('+7');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<listCuratorType[]>(listCurator); // State для главных данных
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки
  const [currentPage, setCurrentPage] = useState<number>(1); // State для отображения текущей страницы
  const [count] = useState<number>(5); // State для отображения количества элементов на каждой странице
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // пример запроса на сервер
      // const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      // setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

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
  useEffect(() => {
    getAllFranchise().then(() => setIsLoaded(true));
  }, []);
  console.log(franchises);
  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.contentBlock}>
      <div className={styles.wrapStaticBlock}>
        <div className={styles.bigButton}>
          <CustomButton type="bigButton" size="large" onClick={() => setShowModal(true)}>
            Добавить
          </CustomButton>
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
            <CustomButton>Найти</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        <Table list={currentItem} colNames={colNamesCurator} loading={loading}>
          {franchises.map((item, idx) => (
            <tr key={item.inn || idx}>
              <td>{`${item.fullName || ''} ${item.shortName}`}</td>
              <td>{item.city || '-'}</td>
              <td>{item.legalAddress || '-'}</td>
              <td>{item.phone ? `${item.phone} ${item.email}` : '-'}</td>
              <td>{item.ogrn ? `${item.ogrn} ${item.inn} ${item.kpp}` : '-'}</td>
              <td>{item.checkingAccount || '-'}</td>
              <td>{item.bankBill || '-'}</td>
              <td>{item.bankName || '-'}</td>
              <td>{item.bankBIK ? `${item.bankBIK} ${item.bankINN} ${item.bankKPP}` : '-'}</td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationCuratorBlock}>
        <CustomPagination
          currentPage={currentPage}
          currentItem={currentItem}
          paginate={paginate}
          count={count}
          next={nextPage}
          prev={prevPage}
          total={listCurator.length}
        />
      </div>
      <div className={styles.modalContent}>
        <FranchisingModal showModal={showModal} setShowModal={() => setShowModal(false)} />
      </div>
    </div>
  );
});

export default FranchisingPage;
