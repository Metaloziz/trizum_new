import React, { FC } from 'react';
import FranchisingPage from '@components/franchising-page/FranchisingPage';

type Props = Record<string, unknown>;

const TutorMain: FC<Props> = (props) => {
  return (
    <div>
      <FranchisingPage />
    </div>
  );
};

export default TutorMain;
