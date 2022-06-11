import cn from 'classnames';
import { FC } from 'react';
import Navigation from '@components/navigation/Navigation';
import { Routes } from '@constants/Routes';
import useComponentVisible from '@HOC/drop-down-hook/DropDownHook';
import homeImage from '@svgs/student-navigation-link-home.svg';
import paymentImage from '@svgs/student-navigation-link-payment.svg';
import resultsImage from '@svgs/student-navigation-link-results.svg';
import styles from './DropDownMenu.module.scss';
interface Props {
  active: boolean;
  onClose: () => void;
}

const DropDownMenu: FC<Props> = ({ active, onClose }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true, 'burger', onClose, true);
  const { Index, Results, Payment } = Routes;
  return (
    <div
      className={cn(styles.dropDownMenu, active && styles.showDropDown)}
      ref={ref}
    >
      {isComponentVisible && (
        <Navigation
          links={[
            { label: 'Главная', href: Index, imageSrc: homeImage },
            {
              label: 'Ваши результаты',
              href: Results,
              imageSrc: resultsImage,
            },
            { label: 'Оплата', href: Payment, imageSrc: paymentImage },
          ]}
          linkClassName={styles.link}
          linkWrapperClassName={styles.linkWrapper}
          linkImageClassName={styles.linkImage}
        />
      )}
    </div>
  );
};

export default DropDownMenu;
