import React, { FC } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import Rate from '@components/rate/Rate';
import Custom404 from '@pages/404.page';
import { observer } from 'mobx-react-lite';

const IndexPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
      return <Rate />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
