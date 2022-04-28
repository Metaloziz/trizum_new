import { FC } from 'react';
import Navigation from '@components/navigation/Navigation';
import { Routes } from '@constants/Routes';
import homeImage from '@svgs/student-navigation-link-home.svg';
import paymentImage from '@svgs/student-navigation-link-payment.svg';
import resultsImage from '@svgs/student-navigation-link-results.svg';
import styles from './DropDownMenu.module.scss';

interface Props {
  active: boolean;
}

const DropDownMenu: FC<Props> = ({ active }) => {
  const { Index, Results, Payment } = Routes;
  const finalStyle = `${styles.dropDownMenu} ${
    active ? styles.showDropDown : ''
  }`;
  return (
    <div className={finalStyle}>
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
    </div>
  );
};

export default DropDownMenu;
