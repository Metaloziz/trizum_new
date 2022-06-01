import Image from 'next/image';
import { FC, useState } from 'react';
import hoverNext from '@svgs/hover-next-pagination.svg';
import next from '@svgs/next-pagination.svg';

const PaginationNextArrows: FC = () => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      <Image
        src={isShowHover ? next : hoverNext}
        alt={'next'}
        width={7}
        height={10}
      />
    </div>
  );
};

export default PaginationNextArrows;
