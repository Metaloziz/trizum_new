import React, { FC, useState } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './CardStudentForUser.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import iconFlag from 'assets/svgs/icon-flag.svg';
import iconMonkey from 'assets/svgs/monkey.svg';
import iconTelegram from 'assets/svgs/telegram.svg';
import iconWhatsApp from 'assets/svgs/whats-app.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';
import avatar from 'public/img/pervoklasnin.jpg';

type Props = {
  user: {
    fullName: string;
    role: string;
    city: string;
    phone: string;
    birthdate: string;
    email: string;
  };
};

const CardStudentForStudent: FC<Props> = props => {
  const {
    user: { birthdate, city, phone, role, email, fullName },
  } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const olympiadId = 1;
  const userId = 1;
  const onParticipateClick = () => {
    navigate(`${AppRoutes.Olympiads}/${olympiadId}/${userId}`);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image src={avatar} width="170" height="170" alt="student" />
        </CustomImageWrapper>
        <div>
          <h3 className={styles.title}>{fullName}</h3>
          <div className={styles.mt15}>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconMonkey} width="25" height="25" alt="icon monkey" />
                </span>
                Статус:
              </li>
              <li>{role}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconFlag} width="25" height="25" alt="flag" />
                </span>
                Город:
              </li>
              <li>{city}</li>
            </ul>
            {/* <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconParrot} width="25" height="25" alt="parrot" />
                </span>
                Учитель:
              </li>
              <li>Евсеев Виктор Петрович</li>
            </ul> */}
            {/* <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width="25" height="25" alt="icon tablet" />
                </span>
                Следующее занятие:
              </li>
              <li>01.02.2021 в 18:00</li>
            </ul> */}
          </div>
        </div>
      </div>
      <div className={cn(styles.row, styles.buttonGroup)}>
        <div className={styles.social}>
          <span>Ссылки на чаты:</span>
          <Image src={iconTelegram} width="25" height="25" alt="icon tablet" />
          <Image src={iconWhatsApp} width="25" height="25" alt="icon tablet" />
        </div>
        <Button size="small" onClick={() => setShowModal(true)}>
          Принять участие в олимпиаде
        </Button>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.modalContent}>
          <Panel className={styles.panel}>Олимпиада - неделя антипазла</Panel>
          <div>
            <p>
              Высокий уровень вовлечения представителей целевой аудитории является четким
              доказательством простого факта: реализация намеченных плановых заданий создаёт
              необходимость включения в производственный план целого ряда внеочередных мероприятий с
              учётом комплекса глубокомысленных рассуждений. Как принято считать, сторонники
              тоталитаризма в науке, превозмогая сложившуюся непростую экономическую ситуацию,
              своевременно верифицированы.
            </p>
          </div>
          <div className={styles.btn}>
            <Button onClick={onParticipateClick}>Принять участие в олимпиаде</Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default CardStudentForStudent;
