import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '@components/choice-game/ChoiceGame.module.scss';
import arrowButton from '@svgs/arrow-btn.svg';

const BackButton = () => {
  const router = useRouter();
  return (
    <button className={styles.prev} onClick={() => router.back()}>
      <span>
        <Image src={arrowButton} width={'15px'} height={'10px'} />
      </span>
      <p>На предыдущую страницу</p>
    </button>
  );
};

export default BackButton;
