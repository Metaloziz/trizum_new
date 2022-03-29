import { FunctionComponent } from 'react';
import Navigation from '@components/navigation/Navigation';
import styles from './Sidebar.module.scss';

const Sidebar: FunctionComponent = () => {
  return (
    <aside className={styles.sidebar}>
      <Navigation
        links={[
          { label: 'Главная', href: '/' },
          { label: 'Ваши результаты', href: 'results' },
          { label: 'Оплата', href: 'payment' },
        ]}
        linkClassName={styles.navigationLink}
      />
    </aside>
  );
};

export default Sidebar;
