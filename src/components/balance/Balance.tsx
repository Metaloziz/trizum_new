import { FC } from 'react';
import Button from '@components/button/Button';
import { options } from '@components/moks-data/moks-data-balance';
import CustomSelect from '@components/select/CustomSelect';
import styles from './Balance.module.scss';

const Balance: FC = () => {
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
      </div>
    </div>
  );
};

export default Balance;
