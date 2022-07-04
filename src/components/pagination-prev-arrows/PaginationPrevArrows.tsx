import { FC, useState } from 'react';

import hoverPrevious from 'assets/svgs/hover-prev-pagination.svg';
import previous from 'assets/svgs/prev-pagination.svg';
import Image from 'components/image/Image';

const PaginationPrevArrows: FC = () => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div onMouseOver={() => setShowHover(true)} onMouseOut={() => setShowHover(false)}>
      <Image src={isShowHover ? hoverPrevious : previous} alt="prev" width={7} height={10} />
    </div>
  );
};

export default PaginationPrevArrows;
