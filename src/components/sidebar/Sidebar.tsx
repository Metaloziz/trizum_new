import { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Navigation from '@components/navigation/Navigation';
import { Routes } from '@constants/Routes';
import homeImage from '@svgs/student-navigation-link-home.svg';
import paymentImage from '@svgs/student-navigation-link-payment.svg';
import resultsImage from '@svgs/student-navigation-link-results.svg';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const {
    Index,
    Payment,
    Statistic,
    Schedule,
    Results,
    Administrator,
    FranchiseeAdministratorMain,
    TeacherMain,
    StatisticsTeachers,
    TeacherTraining,
    TeacherItemResult,
    AddNews,
    AddTest,
    AddHomework,
    Testing,
    Classes,
    CuratorHome,
    Dashboard,
    FindTariff,
    Tariff,
    ForgotPassword,
    ResetPassword,
    PersonaData,
    Scenario,
    Signin,
    Signout,
    Signup,
    SettingGames,
    BlockShulte,
    Games,
    Blog,
  } = Routes;
  const { role } = appStore;
  let links: { label: string; href: string; imageSrc: string }[];
  switch (role) {
    case Roles.Teacher:
      links = [
        { label: 'Главная', href: Index, imageSrc: homeImage },
        { label: 'Расписание', href: Schedule, imageSrc: resultsImage },
        { label: 'Оплата', href: Payment, imageSrc: paymentImage },
      ];
      break;
    case Roles.TeacherEducation:
      links = [{ label: 'Главная', href: Index, imageSrc: homeImage }];
      break;
    case Roles.Student:
    default:
      links = [
        { label: 'Главная', href: Index, imageSrc: homeImage },
        { label: 'Ваши результаты', href: Statistic, imageSrc: resultsImage },
        { label: 'Оплата', href: Payment, imageSrc: paymentImage },
        { label: 'Список игр', href: Games, imageSrc: paymentImage },
        { label: 'Статьи', href: Blog, imageSrc: paymentImage },
      ];
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
