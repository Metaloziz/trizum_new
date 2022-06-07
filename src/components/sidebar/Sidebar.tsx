import { FC } from 'react';
import Navigation from '@components/navigation/Navigation';
import { Routes } from '@constants/Routes';
import homeImage from '@svgs/student-navigation-link-home.svg';
import paymentImage from '@svgs/student-navigation-link-payment.svg';
import resultsImage from '@svgs/student-navigation-link-results.svg';
import styles from './Sidebar.module.scss';
import appStore, {Roles} from "@app/stores/appStore";

const Sidebar: FC = () => {
  const { Index, Results, Payment,TeacherMain,Schedule } = Routes;
  const {role} = appStore
  let links:{label: string, href:string, imageSrc:string}[];
  switch (role) {
    case Roles.Teacher:
      links = [
        { label: 'Главная', href: Index, imageSrc: homeImage },
        { label: 'Расписание', href: Schedule, imageSrc: resultsImage },
        { label: 'Оплата', href: Payment, imageSrc: paymentImage },
      ]
      break
    case Roles.Student:
    default:
    links = [
      { label: 'Главная', href: Index, imageSrc: homeImage },
      { label: 'Ваши результаты', href: Results, imageSrc: resultsImage },
      { label: 'Оплата', href: Payment, imageSrc: paymentImage },
    ]
  }
  return (
    <aside className={styles.sidebar}>
      <Navigation
        links={links}
        linkClassName={styles.link}
        linkWrapperClassName={styles.linkWrapper}
        linkImageClassName={styles.linkImage}
        activeClassName={styles.activeLink}
      />
    </aside>
  );
};

export default Sidebar;
