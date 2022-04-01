import AdminInfoList from '@components/admin-info-list/AdminInfoList';
import BtnExcelImg from '@components/btn-excel-img/BtnExcelImg';
import Button from '@components/button/Button';
import CustomCalendar from '@components/calendar/CustomCalendar';
import { homework, group, city, franchisees, paidFor, legalAddress } from '@components/moks-data/moks-data-select';
import { colNames, list } from '@components/moks-data/moks-data-table';
import Pagination from '@components/pagination/Pagination';
import CustomSelect from '@components/select/CustomSelect';
import Table from '@components/table/Table';
import styles from './Administration.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <div className={styles.wrapBlock}>
            <div>
              <div className={`${styles.oneBlock} ${styles.infoBlock}`}>
                <div>
                  <p>Выполнил Д/З</p>
                </div>
                <div className={styles.selectBlock}>
                  <CustomSelect options={homework} placeholder={' '} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.infoBlock}`}>
                <div>
                  <p>Город</p>
                </div>
                <div className={styles.selectBlock}>
                  <CustomSelect options={city} placeholder={''} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.infoBlock}`}>
                <div>
                  <p>Группа</p>
                </div>
                <div className={styles.selectBlock}>
                  <CustomSelect options={group} placeholder={''} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.inputBlock}`}>
                <div>
                  <p>ФИО ученика</p>
                </div>
                <div>
                  <input type='text' placeholder={' '} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.inputBlock}`}>
                <div>
                  <p>Статус пользователя</p>
                </div>
                <div>
                  <input type='text' placeholder={' '} />
                </div>
              </div>
            </div>
            <div>
              <div className={`${styles.oneBlock} ${styles.franchisees}`}>
                <div>
                  <p>ФИО франчази</p>
                </div>
                <div className={styles.franchisees}>
                  <CustomSelect options={franchisees} placeholder={' '} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.infoBlock}`}>
                <div>
                  <p>Оплачен</p>
                </div>
                <div className={styles.selectBlock}>
                  <CustomSelect options={paidFor} placeholder={''} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.dataInfo}`}>
                <div>
                  <p>Дата рождения</p>
                </div>
                <div className={styles.dataBlock}>
                  <input type='text' placeholder={' '} />
                  <CustomCalendar />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.infoBlock}`}>
                <div>
                  <p>Возраст</p>
                </div>
                <div>
                  <input type='text' placeholder={' '} />
                </div>
              </div>
            </div>
            <div>
              <div className={`${styles.oneBlock} ${styles.legalBlock}`}>
                <div>
                  <p>Юр. адрес</p>
                </div>
                <div className={styles.selectBlock}>
                  <CustomSelect options={legalAddress} placeholder={' '} />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.dataInfoAll}`}>
                <div>
                  <p>Дата начала действия</p>
                </div>
                <div className={styles.dataBlock}>
                  <input type='text' placeholder={' '} />
                  <CustomCalendar />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.dataInfoAll}`}>
                <div>
                  <p>Дата окончания действия</p>
                </div>
                <div className={styles.dataBlock}>
                  <input type='text' placeholder={' '} />
                  <CustomCalendar />
                </div>
              </div>
              <div className={`${styles.oneBlock} ${styles.dataInfoAll}`}>
                <BtnExcelImg />
                <div>
                  <Button>Найти</Button>
                </div>
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
