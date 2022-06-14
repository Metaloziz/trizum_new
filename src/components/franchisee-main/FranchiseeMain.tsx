import React, { FC } from 'react';

import ScheduleDnD from '@components/schedule/ScheduleDnD';

type Props = Record<string, unknown>;

const FranchiseeMain: FC<Props> = props => (
  <div>
    <ScheduleDnD />
  </div>
);

export default FranchiseeMain;
