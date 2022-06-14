import { useEffect, useState } from 'react';

import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import CustomPagination from '@components/custom-pagination/CustomPagination';
import InformationItem from '@components/information-item/InformationItem';
import {
  colNamesCurator,
  listCuratorType,
  listCurator,
  city,
} from '@components/moks-data/moks-data-curator';
import Table from '@components/table/Table';

import styles from './FranchisingPage.module.scss';

const FranchisingPage = () => {
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
  
  const handleMask = (value: string) => {
    if (Number.isInteger(value)) {
      setMask(value);
    }
  };
  
  return (
    <div className={styles.contentBlock}>
      <div className={styles.wrapStaticBlock}>
        <div className={styles.bigButton}>
          <CustomButton type='bigButton' size='large' onClick={() => setShowModal(true)}>
            Добавить
          </CustomButton>
        </div>
        <div className={styles.infoContent}>
          <InformationItem title='Полное наименование' variant='input' />
          <InformationItem title='Короткое наименование' variant='input' />
          <InformationItem title='ИНН' variant='input' mask='inn' />
        </div>
        <div className={styles.infoContent}>
          <InformationItem
            title='Телефон'
            variant='input'
            mask='phone'
            onChange={() => handleMask(mask)}
            value='mask'
          />
          <InformationItem title='E-mail' variant='input' />
          <InformationItem title='Город' variant='select' placeholder='Москва' option={city} />
        </div>
        <div className={styles.findBtn}>
          <InformationItem title='Номер счёта' variant='input' />
          <div className={styles.btnText}>
            <CustomButton>Найти</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        <Table list={currentItem} colNames={colNamesCurator} loading={loading} />
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
        <BasicModal visibility={showModal} changeVisibility={setShowModal}>
          <div className={styles.modalWrap}>
            <div className={styles.modalContent}>
              <div>
                <InformationItem title='Полное наименование' variant='input' />
                <InformationItem title='Короткое наименование' variant='input' />
                <InformationItem title='ИНН' variant='input' />
                <InformationItem title='Юр. адрес' variant='input' />
                <InformationItem title='Фактический адрес' variant='input' />
                <InformationItem title='Наименование школы' variant='input' />
                <InformationItem title='ОГРН' variant='input' />
                <InformationItem title='КПП' variant='input' />
                <InformationItem title='Расчётный счёт' variant='input' />
              </div>
              <div>
                <InformationItem title='Телефон' variant='input' />
                <InformationItem title='E-mail' variant='input' />
                <InformationItem title='Город' variant='input' />
                <InformationItem title='КПП' variant='input' />
                <InformationItem title='Корр. счёт банка' variant='input' />
                <InformationItem title='БИК банка' variant='input' />
                <InformationItem title='ИНН банка' variant='input' />
                <InformationItem title='КПП банка' variant='input' />
              </div>
            </div>
            <div className={styles.btnBlock}>
              <CustomButton onClick={() => console.log('Сохранить')}>Сохранить</CustomButton>
            </div>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

export default FranchisingPage;
