import styles from './RateAddEditPage.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';

const RateAddEditPage = () => (
  <div className={styles.innerContent}>
    <div className={styles.name}>
      <div className={styles.code}>
        <p>Название/код</p>
        <InformationItem variant="input" />
      </div>
      <div className={styles.tariff}>
        <p>Найти тариф</p>
        <InformationItem variant="input" />
      </div>
    </div>
    <div className={styles.cost}>
      <div className={styles.text}>
        <p>Стоимость</p>
        <div className={styles.from}>
          <span>От</span>
          <InformationItem variant="input" />
        </div>
        <div className={styles.from}>
          <span>До</span>
          <InformationItem variant="input" />
        </div>
      </div>
      <div className={styles.addBtn}>
        <Button>Добавить</Button>
      </div>
    </div>
    <div className={styles.start}>
      <InformationItem variant="calendar" title="Дата начала действия" dataAuto="startAction" />
    </div>
    <div className={styles.start}>
      <InformationItem variant="calendar" title="Дата окончания действия" dataAuto="endAction" />
    </div>
    <div className={styles.start}>
      <InformationItem variant="select" title="Дата окончания действия" />
    </div>
  </div>
);

export default RateAddEditPage;
