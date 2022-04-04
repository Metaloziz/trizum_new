import AdminInfoList from '@components/admin-info-list/AdminInfoList';
import Button from '@components/button/Button';
import CustomCalendar from '@components/calendar/CustomCalendar';
import Pagination from '@components/pagination/Pagination';
import CustomSelect from '@components/select/CustomSelect';
import Table from '@components/table/Table';
import ListItemText from '@pages/administrator/list-item-text/ListItemText';
import styles from './Administration.module.scss';

const list = [
  {
    id: 1,
    studentName: 'Самойленко И.Н.',
    teacherName: 'Свичкарь А.А.',
    age: 9,
    registrationDate: '11/03/2021',
    startDateAction: '11/04/2021',
    endDateAction: '11/04/2021',
    tariff: 'Начальный',
    paymentDate: '11/04/2021',
    status: 'Новый',
    legalAddress: 'Москва, ул. Ленина, 3/43',
  },
  {
    id: 2,
    studentName: 'Самойленко И.Н.',
    teacherName: 'Свичкарь А.А.',
    age: 9,
    registrationDate: '11/03/2021',
    startDateAction: '11/04/2021',
    endDateAction: '11/04/2021',
    tariff: 'Начальный',
    paymentDate: '11/04/2021',
    status: 'Новый',
    legalAddress: 'Москва, ул. Ленина, 3/43',
  },
  {
    id: 3,
    studentName: 'Самойленко И.Н.',
    teacherName: 'Свичкарь А.А.',
    age: 9,
    registrationDate: '11/03/2021',
    startDateAction: '11/04/2021',
    endDateAction: '11/04/2021',
    tariff: 'Начальный',
    paymentDate: '11/04/2021',
    status: 'Новый',
    legalAddress: 'Москва, ул. Ленина, 3/43',
  },
  {
    id: 4,
    studentName: 'Самойленко И.Н.',
    teacherName: 'Свичкарь А.А.',
    age: 9,
    registrationDate: '11/03/2021',
    startDateAction: '11/04/2021',
    endDateAction: '11/04/2021',
    tariff: 'Начальный',
    paymentDate: '11/04/2021',
    status: 'Новый',
    legalAddress: 'Москва, ул. Ленина, 3/43',
  },
];

const colNames = [
  '№',
  'ФИО ученика',
  'ФИО учителя',
  'Возраст',
  'Дата регистрации',
  'Дата начала действия',
  'Дата окончания действия',
  'Тариф',
  'Дата оплаты',
  'Статус',
  'Юр. адрес',
];

const homework = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const city = [
  { value: 'Москва', label: 'Москва' },
  { value: 'Ростов', label: 'Ростов' },
  { value: 'Аюта', label: 'Аюта' },
];

const group = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const franchisees = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const paidFor = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const legalAddress = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

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
                <div className={styles.excel}>
                  <Button>Выгрузиль в Excel</Button>
                  <div className={styles.excelPic}>
                    <svg width='14' height='19' viewBox='0 0 14 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8.50838 0H2.33333C1.04467 0 0 1.06332 0 2.375V16.625C0 17.9367 1.04467 19 2.33333 19H11.6667C12.9553 19 14 17.9367 14 16.625V5.58969C14 5.27474 13.8771 4.9727 13.6583 4.75L9.33333 0.347811C9.11454 0.125111 8.81779 0 8.50838 0ZM8.75 4.15625V1.78125L12.25 5.34375H9.91667C9.27233 5.34375 8.75 4.81209 8.75 4.15625ZM4.53148 7.93241L7.00001 10.9475L9.46855 7.93241C9.6748 7.68049 10.0426 7.64645 10.2901 7.85638C10.5376 8.06631 10.5711 8.44071 10.3648 8.69262L7.75934 11.875L10.3648 15.0574C10.5711 15.3093 10.5376 15.6837 10.2901 15.8936C10.0426 16.1036 9.6748 16.0695 9.46855 15.8176L7.00001 12.8025L4.53148 15.8176C4.32523 16.0695 3.9574 16.1036 3.70991 15.8936C3.46241 15.6837 3.42897 15.3093 3.63522 15.0574L6.24068 11.875L3.63522 8.69262C3.42897 8.44071 3.46241 8.06631 3.70991 7.85638C3.9574 7.64645 4.32523 7.68049 4.53148 7.93241Z'
                        fill='url(#paint0_linear_11252_2)'
                      />
                      <defs>
                        <linearGradient
                          id='paint0_linear_11252_2'
                          x1='-7.17117e-08'
                          y1='9.50004'
                          x2='14'
                          y2='9.50004'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stopColor='#7F28D9' />
                          <stop offset='1' stopColor='#7427CC' />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
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
