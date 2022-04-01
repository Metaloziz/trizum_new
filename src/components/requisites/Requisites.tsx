import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Button from '@components/button/Button';
import Panel from '@components/panel/Panel';
import requisitiesImage from '@images/qr-code.png';
import styles from './Requisites.module.scss';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Requisites: FC<Props> = ({}) => {
  return (
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
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Button>Скачать платежное поручение</Button>
            <div className={styles.infoLink}>
              <Link href={' '}>
                <a>Скачать договор</a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.qrImg}>
          <Image src={requisitiesImage} alt='qr-code' width={231} height={231} />
        </div>
      </div>
    </div>
  );
};

export default Requisites;
