import { FC } from 'react';

import styles from '@components/choice-game/ChoiceGame.module.scss';
import arrowButton from '@svgs/arrow-btn.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

const BackButton: FC = () => {
  const router = useRouter();
  return (
    <div className={styles.backButton}>
      <button type="button" className={styles.prev} onClick={() => router.back()}>
        <span>
          <Image src={arrowButton} width="15px" height="10px" />
        </span>
        <p>На предыдущую страницу</p>
      </button>
    </div>
  );
};

export default BackButton;
