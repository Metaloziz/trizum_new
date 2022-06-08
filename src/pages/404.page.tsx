import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BackButton from '@components/backButton/BackButton';
import { Routes } from '@constants/Routes';
import buttonImage from '@svgs/arrow-btn.svg';
import resultIcon from '@svgs/result-icon.svg';
import styles from './Home.module.scss';

const Custom404 = () => {
  const { Index } = Routes;
  const iconButton = (
    <Image src={buttonImage} alt={'arrow'} width={26} height={13} />
  );
  return (
    <div className={styles.innerContainer}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <div className={styles.content}>
        <Image src={resultIcon} width={'325px'} height={'340px'} alt={'404'} />
        <h1>404</h1>
        <p>Такой страницы не существует</p>
        <Link href={Index} passHref>
          <a className={styles.backIndex}>
            <i>Вернуться на главную</i>
            <span className={styles.arrowBtn}>{iconButton}</span>
          </a>
        </Link>
        <div className={styles.tableBtn}>
          <div></div>
          <div></div>
        </div>
        <div className={styles.leftBtn}></div>
      </div>
    </div>
  );
};

export default Custom404;
