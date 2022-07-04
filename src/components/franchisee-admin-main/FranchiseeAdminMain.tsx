import React, { FC } from 'react';

import ScheduleDnD from 'components/schedule/ScheduleDnD';

type Props = Record<string, unknown>;

const FranchiseeAdminMain: FC<Props> = props => (
  <div>
    <ScheduleDnD />
  </div>
);

export default FranchiseeAdminMain;
