import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {
  city,
  franchisees,
  group,
  legalAddress,
} from '@components/moks-data/moks-data-select';
import { colNames, list } from '@components/moks-data/moks-data-table';
import Pagination from '@components/pagination/Pagination';
import Table from '@components/table/Table';
import styles from './StatisticsTeachers.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.wrapStaticBlock}>
        <div>
          <InformationItem
            size={'large'}
            title={'Город'}
            variant={'select'}
            option={city}
          />
          <InformationItem
            size={'large'}
            title={'Группа'}
            variant={'select'}
            option={group}
          />
          <InformationItem title={'ФИО ученика'} variant={'input'} />
          <InformationItem title={'Статус пользователя'} variant={'input'} />
        </div>
        <div className={styles.franchiseesBlock}>
          <InformationItem
            title={'ФИО франчази'}
            variant={'select'}
            option={franchisees}
          />
          <InformationItem title={'Дата рождения'} variant={'calendar'} />
          <InformationItem title={'Возраст'} variant={'input'} />
        </div>
        <div className={styles.legalAddress}>
          <InformationItem
            title={'Юр. адрес'}
            variant={'select'}
            option={legalAddress}
          />
          <InformationItem
            title={'Дата начала действия'}
            variant={'calendar'}
          />
          <InformationItem
            title={'Дата окончания действия'}
            variant={'calendar'}
          />
          <div className={styles.btnStaticBlock}>
            <CustomButton type={'addexcel'}>Выгрузить в Excel</CustomButton>
            <CustomButton>Найти</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        <Table list={list} colNames={colNames} />
      </div>
      <div className={styles.paginationStaticBlock}>
        <Pagination initialPage={1} pageCount={30} />
      </div>
    </div>
  );
};

export default IndexPage;
