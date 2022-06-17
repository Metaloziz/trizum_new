import appStore, { Roles } from '@app/stores/appStore';
import Balance from '@components/balance/Balance';
import Requisites from '@components/requisites/Requisites';
import Custom404 from '@pages/404.page';
import { observer } from 'mobx-react-lite';

import styles from './Payment.module.scss';

const IndexPage = observer(() =>
  appStore.role !== Roles.Student ? (
    <Custom404 />
  ) : (
    <div className={styles.innerContent}>
      <Balance />
      <Requisites />
    </div>
  ),
);

export default IndexPage;
