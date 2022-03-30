import { FC } from 'react';
import Navigation from '@components/navigation/Navigation';
import { Routes } from '@constants/Routes';
import homeImage from '@svgs/student-navigation-link-home.svg';
import paymentImage from '@svgs/student-navigation-link-payment.svg';
import resultsImage from '@svgs/student-navigation-link-results.svg';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const { Index, Results, Payment } = Routes;
  return (
    <aside className={styles.sidebar}>
      <Navigation
        links={[
          { label: 'Главная', href: Index, imageSrc: homeImage },
          { label: 'Ваши результаты', href: Results, imageSrc: resultsImage },
          { label: 'Оплата', href: Payment, imageSrc: paymentImage },
        ]}
        linkClassName={styles.link}
        linkWrapperClassName={styles.linkWrapper}
        linkImageClassName={styles.linkImage}
      />
    </aside>
  );
};

export default Sidebar;
