import Image from 'next/image';
import React from 'react';
import iconFlag from '@svgs/icon-flag.svg';
import iconTablet from '@svgs/icon-tablet.svg';
import iconMonkey from '@svgs/monkey.svg';
import iconParrot from '@svgs/parrot.svg';
import styles from './StudentInfo.module.scss';

const StudentInfo = () => {
  return (
    <>
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
            <Image src={iconFlag} width={'25'} height={'25'} alt={'flag'} />
          </span>
          Город:
        </li>
        <li>Москва</li>
      </ul>
      {/*<Divider />*/}
      <ul className={styles.list}>
        <li>
          <span>
            <Image src={iconParrot} width={'25'} height={'25'} alt={'parrot'} />
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
    </>
  );
};

export default StudentInfo;
