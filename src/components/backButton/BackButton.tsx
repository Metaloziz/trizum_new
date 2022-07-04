import { FC } from 'react';

import styles from './BackButton.module.scss';

import arrowButton from 'assets/svgs/arrow-btn.svg';
import Image from 'components/image/Image';
import { useRouter } from 'next/router';

const BackButton: FC = () => {
  const router = useRouter();
  return (
    <div className={styles.backButton}>
      <button type="button" onClick={() => router.back()}>
        <span>
          <Image src={arrowButton} width="15px" height="10px" />
        </span>
        <p>На предыдущую страницу</p>
      </button>
    </div>
  );
};

export default BackButton;
