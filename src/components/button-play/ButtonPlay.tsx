import React, { FC, useState } from 'react';

import buttonPlayHover from '@svgs/button-play-hover.svg';
import buttonPlay from '@svgs/button-play.svg';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

  return (
    <div>
      <motion.button
        whileHover={{
          background: 'linear-gradient(0deg, #9181FA, #9181FA), #CFD8DC',
          border: '3px solid #F3EEFD',
          boxShadow:
            '-4px -4px 12px rgba(253, 255, 255, 0.8), 4px 4px 12px rgba(187, 195, 206, 0.6)',
          transition: {
            ease: [0.17, 0.67, 0.83, 0.67],
            duration: 0.5,
          },
        }}
        whileTap={{
          background: 'linear-gradient(90deg, #7F28D9 0%, #7427CC 100%)',
          boxShadow: 'none',
        }}
        onClick={() => console.log('play')}
        className={cn(styles.buttonPlay, ButtonSize)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Image src={hover ? buttonPlayHover : buttonPlay} alt='play' width='73' height='73' />
        <span className={styles.playButton}>{title}</span>
      </motion.button>
    </div>
  );
};

export default ButtonPlay;
