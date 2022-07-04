import { FC } from 'react';

import cn from 'classnames';

import styles from './DropDownMenu.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import homeImage from 'assets/svgs/student-navigation-link-home.svg';
import paymentImage from 'assets/svgs/student-navigation-link-payment.svg';
import resultsImage from 'assets/svgs/student-navigation-link-results.svg';
import Navigation from 'components/navigation/Navigation';
import useComponentVisible from 'HOC/drop-down-hook/DropDownHook';

interface Props {
  active: boolean;
  onClose: () => void;
}

const DropDownMenu: FC<Props> = ({ active, onClose }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(
    true,
    'burger',
    onClose,
    true,
  );
  const { Index, Payment } = AppRoutes;
  return (
    <div className={cn(styles.dropDownMenu, active && styles.showDropDown)} ref={ref}>
      {isComponentVisible && (
        <Navigation
          links={[
            { label: 'Главная', href: Index, imageSrc: homeImage },
            {
              label: 'Ваши результаты',
              href: AppRoutes.Statistic,
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
