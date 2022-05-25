import Image from 'next/image';
import { FC, useState } from 'react';
import hoverNext from '@svgs/hover-next-pagination.svg';
import next from '@svgs/next-pagination.svg';
import styles from './PaginationNextArrows.module.scss';

interface Props {
  isActive: boolean;
}

const PaginationNextArrows: FC<Props> = ({ isActive = true }) => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div
      style={{ opacity: isActive ? 1 : 0.2 }}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
      className={styles.button}
    >
      <Image
        src={isShowHover ? next : hoverNext}
        alt={'pagination'}
        width={7}
        height={10}
      />
    </div>
  );
};

export default PaginationNextArrows;
