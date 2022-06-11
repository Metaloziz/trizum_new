import React, { FC } from 'react';
import ScheduleDnD from '@components/schedule/ScheduleDnD';

type Props = Record<string, unknown>;

const FranchiseeMain: FC<Props> = (props) => {
  return (
    <div>
      <ScheduleDnD />
    </div>
  );
};

export default FranchiseeMain;
