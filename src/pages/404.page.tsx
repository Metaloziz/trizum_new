import React from 'react';

import { NavLink } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import buttonImage from 'assets/svgs/arrow-btn.svg';
import resultIcon from 'assets/svgs/result-icon.svg';
import BackButton from 'components/backButton/BackButton';
import Image from 'components/image/Image';
import styles from 'pages/home/Home.module.scss';

const Custom404 = () => {
  const { Index } = AppRoutes;
  const iconButton = <Image src={buttonImage} alt="arrow" width={26} height={13} />;
  return (
    <div className={styles.innerContainer}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <div className={styles.content}>
        <Image src={resultIcon} width="325px" height="340px" alt="404" />
        <h1>404</h1>
        <p>Такой страницы не существует</p>
        <NavLink to={Index}>
          <div className={styles.backIndex}>
            <i>Вернуться на главную</i>
            <span className={styles.arrowBtn}>{iconButton}</span>
          </div>
        </NavLink>
        <div className={styles.tableBtn}>
          <div />
          <div />
        </div>
        <div className={styles.leftBtn} />
      </div>
    </div>
  );
};

export default Custom404;
