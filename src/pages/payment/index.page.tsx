import Balance from '@components/balance/Balance';
import Requisites from '@components/requisites/Requisites';
import styles from './Payment.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.innerContent}>
      <Balance />
      <Requisites />
    </div>
  );
};

export default IndexPage;
