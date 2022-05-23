import Image from 'next/image';
import { useState } from 'react';
import hoverNext from '@svgs/hover-next-pagination.svg';
import next from '@svgs/next-pagination.svg';

const PaginationNextArrows = () => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
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
