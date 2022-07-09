import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './BackButton.module.scss';

import arrowButton from 'assets/svgs/arrow-btn.svg';
import Image from 'components/image/Image';

const BackButton: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.backButton}>
      <button type="button" onClick={() => navigate(-1)}>
        <span>
          <Image src={arrowButton} width="15px" height="10px" />
        </span>
        <p>На предыдущую страницу</p>
      </button>
    </div>
  );
};

export default BackButton;
