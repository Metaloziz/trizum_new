import Image from 'next/image';
import { FunctionComponent, useState } from 'react';
import buttonPlayHover from '@public/svgs/button-play-hover.svg';
import buttonPlay from '@public/svgs/button-play.svg';
import styles from './ButtonPlay.module.scss';

interface ButtonPlayProps {
  title?: string;
}

const ButtonPlay: FunctionComponent<ButtonPlayProps> = ({ title }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className={styles.buttonPlay} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <div>
        <Image src={hover ? buttonPlayHover : buttonPlay} alt={'play'} width={'73'} height={'75'} />
      </div>
      <div className={styles.playButton}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ButtonPlay;
