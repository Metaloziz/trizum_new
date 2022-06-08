import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import styles from './FindTariff.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.innerContent}>
      <div className={styles.name}>
        <div className={styles.code}>
          <p>Название/код</p>
          <InformationItem variant={'input'} />
        </div>
        <div className={styles.tariff}>
          <p>Найти тариф</p>
          <InformationItem variant={'input'} />
        </div>
      </div>
      <div className={styles.cost}>
        <div className={styles.text}>
          <p>Стоимость</p>
          <div className={styles.from}>
            <span>От</span>
            <InformationItem variant={'input'} />
          </div>
          <div className={styles.from}>
            <span>До</span>
            <InformationItem variant={'input'} />
          </div>
        </div>
        <div className={styles.addBtn}>
          <CustomButton>Добавить</CustomButton>
        </div>
      </div>
      <div className={styles.start}>
        <InformationItem
          variant={'calendar'}
          title={'Дата начала действия'}
          dataAuto={'startAction'}
        />
      </div>
      <div className={styles.start}>
        <InformationItem
          variant={'calendar'}
          title={'Дата окончания действия'}
          dataAuto={'endAction'}
        />
      </div>
      <div className={styles.start}>
        <InformationItem variant={'select'} title={'Дата окончания действия'} />
      </div>
    </div>
  );
};

export default IndexPage;
