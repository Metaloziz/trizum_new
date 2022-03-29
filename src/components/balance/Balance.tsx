import { FunctionComponent } from 'react';
import Button from '@components/button/Button';
import CustomCalendar from '@components/calendar/CustomCalendar';
import CustomSelect from '@components/select/CustomSelect';
import styles from './Balance.module.scss';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const Balance: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.price}>
        <div className={styles.priceContainer}>
          <p>Средств на балансе:</p>
          <span>4 000 ₽</span>
        </div>
      </div>
      <div className={styles.period}>
        <p>Период пополнения (месяц)</p>
        <div className={styles.periodSelected}>
          <CustomSelect options={options} placeholder={' '} />
        </div>
      </div>
      <div>
        <Button>Сформировать</Button>
        <CustomCalendar />
      </div>
    </div>
  );
};

export default Balance;
