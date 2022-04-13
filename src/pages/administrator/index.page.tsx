import AdminInfoList from '@components/admin-info-list/AdminInfoList';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {
  homework,
  group,
  city,
  franchisees,
  paidFor,
  legalAddress,
} from '@components/moks-data/moks-data-select';
import { colNames, list } from '@components/moks-data/moks-data-table';
import Pagination from '@components/pagination/Pagination';
import Table from '@components/table/Table';
import styles from './Administration.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <div className={styles.wrapBlock}>
            <div className={styles.infoBlock}>
              <InformationItem
                size={'large'}
                title={'Выполнил Д/З'}
                variant={'select'}
                option={homework}
              />
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
              <InformationItem
                title={'Статус пользователя'}
                variant={'input'}
              />
            </div>
            <div className={`${styles.infoBlock} ${styles.franchiseesBlock}`}>
              <InformationItem
                title={'ФИО франчази'}
                variant={'select'}
                option={franchisees}
              />
              <InformationItem
                size={'large'}
                title={'Оплачен'}
                variant={'select'}
                option={paidFor}
              />
              <InformationItem title={'Дата рождения'} variant={'calendar'} />
              <InformationItem title={'Возраст'} variant={'input'} />
            </div>
            <div className={`${styles.infoBlock} ${styles.legalAddress}`}>
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
              <div className={styles.btnBlock}>
                <CustomButton type={'addexcel'}>Выгрузить в Excel</CustomButton>
                <CustomButton>Найти</CustomButton>
              </div>
            </div>
          </div>
          <Table list={list} colNames={colNames} />
        </div>
        <div className={styles.rightBlock}>
          <AdminInfoList />
        </div>
      </div>
      <div className={styles.paginationBlock}>
        <Pagination initialPage={1} pageCount={30} />
      </div>
    </div>
  );
};

export default IndexPage;
