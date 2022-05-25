import Image from 'next/image';
import { FC, useState } from 'react';
import hoverPrevious from '@svgs/hover-prev-pagination.svg';
import previous from '@svgs/prev-pagination.svg';
import styles from './PaginationArrows.module.scss';

interface Props {
  isActive: boolean;
}

const PaginationPrevArrows: FC<Props> = ({ isActive = true }) => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div
      style={{ opacity: isActive ? 1 : 0.2 }}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
      className={styles.button}
    >
      <Image
        src={isShowHover ? hoverPrevious : previous}
        alt={'pagination'}
        width={7}
        height={10}
      />
    </div>
  );
};

export default PaginationPrevArrows;
