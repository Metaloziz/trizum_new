import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import FranchisingPage from '@components/franchising-page/FranchisingPage';
import Custom404 from '@pages/404.page';

const IndexPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
    case Roles.Tutor:
      return <FranchisingPage />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
