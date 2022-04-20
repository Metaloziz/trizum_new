import Image from 'next/image';
import React, { FC } from 'react';
import CardStudentTitle from '@components/card-student/card-student-title/CardStudentTitle';
import CustomButton from '@components/custom-button/CustomButton';
import CustomImageWrapper from '@components/custom-image-wrapper/CustomImageWrapper';
import avatar from '@public/img/pervoklasnin.jpg';
import iconFlag from '@svgs/icon-flag.svg';
import iconTablet from '@svgs/icon-tablet.svg';
import iconMonkey from '@svgs/monkey.svg';
import iconParrot from '@svgs/parrot.svg';
import iconTelegram from '@svgs/telegram.svg';
import iconWhatsApp from '@svgs/whats-app.svg';
import styles from './CardStudentForUser.module.scss';

interface Props {
  title: string;
}

const CardStudentForUser: FC<Props> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant={'circle'}>
          <Image src={avatar} width={'170'} height={'170'} alt={'student'} />
        </CustomImageWrapper>
        <div>
          <CardStudentTitle>{title}</CardStudentTitle>
          <div className={styles.mt15}>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image
                    src={iconMonkey}
                    width={'25'}
                    height={'25'}
                    alt={'icon monkey'}
                  />
                </span>
                Статус:
              </li>
              <li>Ученик</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image
                    src={iconFlag}
                    width={'25'}
                    height={'25'}
                    alt={'flag'}
                  />
                </span>
                Город:
              </li>
              <li>Москва</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image
                    src={iconParrot}
                    width={'25'}
                    height={'25'}
                    alt={'parrot'}
                  />
                </span>
                Учитель:
              </li>
              <li>Евсеев Виктор Петрович</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image
                    src={iconTablet}
                    width={'25'}
                    height={'25'}
                    alt={'icon tablet'}
                  />
                </span>
                Следующее занятие:
              </li>
              <li>01.02.2021 в 18:00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`${styles.row} ${styles.buttonGroup}`}>
        <div className={styles.social}>
          <span>Ссылки на чаты:</span>
          <Image
            src={iconTelegram}
            width={'25'}
            height={'25'}
            alt={'icon tablet'}
          />
          <Image
            src={iconWhatsApp}
            width={'25'}
            height={'25'}
            alt={'icon tablet'}
          />
        </div>
        <CustomButton size={'small'}>Принять участие в олимпиаде</CustomButton>
      </div>
    </div>
  );
};

export default CardStudentForUser;
