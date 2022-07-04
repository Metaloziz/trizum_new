import { FC, useState } from 'react';

import hoverNext from 'assets/svgs/hover-next-pagination.svg';
import next from 'assets/svgs/next-pagination.svg';
import Image from 'components/image/Image';

const PaginationNextArrows: FC = () => {
  const [isShowHover, setShowHover] = useState(false);
  return (
    <div onMouseOver={() => setShowHover(true)} onMouseOut={() => setShowHover(false)}>
      <Image src={isShowHover ? next : hoverNext} alt="next" width={7} height={10} />
    </div>
  );
};

export default PaginationNextArrows;
