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
  return (
    <div className={styles.content}>
      <div className={styles.wrapStaticBlock}>
        <div>
          <CustomButton type={'bigButton'} size={'large'}>
            Добавить
          </CustomButton>
        </div>
        <div>
          <InformationItem title={'Полное наименование'} variant={'input'} />
          <InformationItem title={'Короткое наименование'} variant={'input'} />
          <InformationItem title={'ИНН'} variant={'input'} />
        </div>
        <div>
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
    </div>
  );
};

export default IndexPage;
