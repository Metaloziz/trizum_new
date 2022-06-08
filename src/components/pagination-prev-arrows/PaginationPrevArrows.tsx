import Image from 'next/image';
import { FC, useState } from 'react';
import hoverPrevious from '@svgs/hover-prev-pagination.svg';
import previous from '@svgs/prev-pagination.svg';
import styles from './PaginationPrevArrows.module.scss';

const PaginationPrevArrows: FC = () => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      <Image
        src={isShowHover ? hoverPrevious : previous}
        alt={'prev'}
        width={7}
        height={10}
      />
    </div>
  );
};

export default PaginationPrevArrows;
