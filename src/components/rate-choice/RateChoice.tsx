import { FC } from 'react';

import styles from './RateChoice.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';

const newStatus = [
  { value: 'Активен', label: 'Активен' },
  { value: 'Не активен', label: 'Не активен' },
  { value: 'Спит', label: 'Спит' },
];

const RateChoice: FC = () => (
  <div className={styles.rateBlock}>
    <div className={styles.rateName}>
      <div className={styles.rateTariff}>
        <p>Наименование/код тарифа</p>
        <InformationItem className={styles.rateInput} variant="input" />
      </div>
      <div className={styles.rateStatus}>
        <p>Статус</p>
        <InformationItem
          className={styles.rateSelect}
          variant="select"
          placeholder="Активен"
          option={newStatus}
        />
      </div>
      <div className={styles.ratePrice}>
        <p>Стоимость</p>
        <div className={styles.rateBlockInput}>
          <InformationItem className={styles.rateValue} variant="input" placeholder="От" />
          <InformationItem className={styles.rateValue} variant="input" placeholder="До" />
        </div>
      </div>
    </div>
    <div className={styles.dataChoice}>
      <div className={styles.dataEnd}>
        <div>
          <p>Дата начала действия</p>
          <InformationItem className={styles.dataCalendar} variant="calendar" />
        </div>
        <div>
          <p>Дата окончания действия</p>
          <InformationItem className={styles.dataCalendar} variant="calendar" />
        </div>
      </div>
      <div className={styles.btnBlock}>
        <Button>Найти</Button>
        <div className={styles.btnAdd}>
          <Button>Добавить</Button>
        </div>
      </div>
    </div>
  </div>
);
export default RateChoice;
