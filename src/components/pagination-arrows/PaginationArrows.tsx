import Image from 'next/image';
import { useState } from 'react';
import following from '@svgs/next-pagination.svg';
import previous from '@svgs/prev-pagination.svg';

const PaginationArrows = () => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      <Image
        src={isShowHover ? following : previous}
        alt={'pagination'}
        width={7}
        height={10}
      />
    </div>
  );
};

export default PaginationArrows;
