import React, { FC } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import HomeworkList from '@components/homework-list/HomeworkList';
import Custom404 from '@pages/404.page';
import { observer } from 'mobx-react-lite';

const IndexPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <HomeworkList />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
