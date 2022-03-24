import { FunctionComponent } from 'react';
import Button from '@components/button/Button';
import styles from './Balance.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Balance: FunctionComponent<Props> = ({}) => {
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
        <div>тут селект</div>
      </div>
      <div>
        <Button>Сформировать</Button>
      </div>
    </div>
  );
};

export default Balance;
