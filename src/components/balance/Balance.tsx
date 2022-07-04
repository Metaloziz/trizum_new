import { FC } from 'react';

import styles from './Balance.module.scss';

import Button from 'components/button/Button';
import { options } from 'components/moks-data/moks-data-balance';
import CustomSelect from 'components/select/CustomSelect';

const Balance: FC = () => (
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

export default Balance;
