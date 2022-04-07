import Image from 'next/image';
import { FunctionComponent, useState } from 'react';
import buttonPlayHover from '@svgs/button-play-hover.svg';
import buttonPlay from '@svgs/button-play.svg';
import styles from './ButtonPlay.module.scss';

type ButtonSize = 'large' | 'normal' | 'medium';

interface ButtonPlayProps {
  title?: string;
  size?: ButtonSize;
}

const ButtonPlay: FunctionComponent<ButtonPlayProps> = ({ title, size }) => {
  const [hover, setHover] = useState(false);

  let ButtonSize = '';
  switch (size) {
    case 'large':
      ButtonSize = styles.large;
      break;
    case 'normal':
      ButtonSize = styles.normal;
      break;
    default:
      ButtonSize = styles.medium;
  }
  const finalStyle = `${styles.content} ${ButtonSize}`;

  return (
    <div className={`${styles.buttonPlay} ${finalStyle}`} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <div>
        <Image src={hover ? buttonPlayHover : buttonPlay} alt={'play'} width={'73'} height={'73'} />
      </div>
      <div className={styles.playButton}>
        <p>{title}</p>
      </div>
      <p>Играть</p>
    </div>
  );
};

export default ButtonPlay;
