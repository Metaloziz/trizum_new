import Image from 'next/image';
import React, { FC, useState } from 'react';
import buttonPlayHover from '@svgs/button-play-hover.svg';
import buttonPlay from '@svgs/button-play.svg';
import styles from './ButtonPlay.module.scss';

type ButtonSize = 'large' | 'normal' | 'medium' | 'small';

interface ButtonPlayProps {
  title?: string;
  size?: ButtonSize;
}

const ButtonPlay: FC<ButtonPlayProps> = ({ title, size }) => {
  const [hover, setHover] = useState(false);

  let ButtonSize = '';
  switch (size) {
    case 'large':
      ButtonSize = styles.large;
      break;
    case 'normal':
      ButtonSize = styles.normal;
      break;
    case 'small':
      ButtonSize = styles.small;
      break;
    default:
      ButtonSize = styles.medium;
  }
  const finalStyle = `${styles.content} ${ButtonSize}`;

  return (
    <div>
      <button
        onClick={() => console.log('play')}
        className={`${styles.buttonPlay} ${finalStyle}`}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Image
          src={hover ? buttonPlayHover : buttonPlay}
          alt={'play'}
          width={'73'}
          height={'73'}
        />
        <span className={styles.playButton}>{title}</span>
      </button>
    </div>
  );
};

export default ButtonPlay;
