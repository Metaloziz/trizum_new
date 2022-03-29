import { FunctionComponent } from 'react';
import Navigation from '@components/navigation/Navigation';
import HomeImage from '@public/assets/svgs/student-navigation-link-home.svg';
import PaymentImage from '@public/assets/svgs/student-navigation-link-payment.svg';
import ResultsImage from '@public/assets/svgs/student-navigation-link-results.svg';
import styles from './Sidebar.module.scss';

const Sidebar: FunctionComponent = () => {
  return (
    <aside className={styles.sidebar}>
      <Navigation
        links={[
          { label: 'Главная', href: '/', imageSrc: HomeImage },
          { label: 'Ваши результаты', href: 'results', imageSrc: ResultsImage },
          { label: 'Оплата', href: 'payment', imageSrc: PaymentImage },
        ]}
        linkClassName={styles.link}
        linkWrapperClassName={styles.linkWrapper}
        linkImageClassName={styles.linkImage}
      />
    </aside>
  );
};

export default Sidebar;
