import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Requisites.module.scss';

import requisitiesImage from 'assets/images/qr-code.png';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type Props = Record<string, unknown>;

const Requisites: FC<Props> = props => (
  <div className={styles.wrapper}>
    <div className={styles.panelBlock}>
      <Panel>Реквизиты для оплаты</Panel>
    </div>
    <div className={styles.info}>
      <div>
        <div className={styles.infoText}>
          <p>Получатель: Публичное акционерное общество “Мобильные ТелеСистемы”</p>
          <p>ИНН/КПП 7740000076/997750001</p>
          <p>Банк получателя: ПАО “МТС-Банк”</p>
          <p>Кор. счет: 30101810600000000232, БИК: 044525232</p>
          <p>Расчётный счёт: 40702810300000050072</p>
          <p>Назначение платежа: Оплата долга по лицевому счету 299740729618</p>
          <span>Сумма к оплате: 99 999 рублей</span>
        </div>
        <div className={styles.containerBtn}>
          <Button>Скачать платежное поручение</Button>
          <div className={styles.infoLink}>
            <NavLink to={' '}>
              <p>Скачать договор</p>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles.qrImg}>
        <Image src={requisitiesImage} alt="qr-code" width={231} height={231} />
      </div>
    </div>
  </div>
);

export default Requisites;
