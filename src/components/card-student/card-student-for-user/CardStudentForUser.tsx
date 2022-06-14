import React, { FC, useState } from 'react';

import BasicModal from '@components/basic-modal/BasicModal';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import CustomButton from '@components/custom-button/CustomButton';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import Panel from '@components/panel/Panel';
import avatar from '@public/img/pervoklasnin.jpg';
import iconFlag from '@svgs/icon-flag.svg';
import iconTablet from '@svgs/icon-tablet.svg';
import iconMonkey from '@svgs/monkey.svg';
import iconParrot from '@svgs/parrot.svg';
import iconTelegram from '@svgs/telegram.svg';
import iconWhatsApp from '@svgs/whats-app.svg';
import cn from 'classnames';
import Image from 'next/image';

import styles from './CardStudentForUser.module.scss';

interface Props {
  title: string;
}

const CardStudentForUser: FC<Props> = ({ title }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant='circle'>
          <Image src={avatar} width='170' height='170' alt='student' />
        </CustomImageWrapper>
        <div>
          <CardStudentTitle>{title}</CardStudentTitle>
          <div className={styles.mt15}>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconMonkey} width='25' height='25' alt='icon monkey' />
                </span>
                Статус:
              </li>
              <li>Ученик</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconFlag} width='25' height='25' alt='flag' />
                </span>
                Город:
              </li>
              <li>Москва</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconParrot} width='25' height='25' alt='parrot' />
                </span>
                Учитель:
              </li>
              <li>Евсеев Виктор Петрович</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width='25' height='25' alt='icon tablet' />
                </span>
                Следующее занятие:
              </li>
              <li>01.02.2021 в 18:00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cn(styles.row, styles.buttonGroup)}>
        <div className={styles.social}>
          <span>Ссылки на чаты:</span>
          <Image src={iconTelegram} width='25' height='25' alt='icon tablet' />
          <Image src={iconWhatsApp} width='25' height='25' alt='icon tablet' />
        </div>
        <CustomButton size='small' onClick={() => setShowModal(true)}>
          Принять участие в олимпиаде
        </CustomButton>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.modalContent}>
          <Panel className={styles.panel}>Олимпиада - неделя антипазла</Panel>
          <div className={styles.modalText}>
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
            <CustomButton>Принять участие в олимпиаде</CustomButton>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default CardStudentForUser;
