import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import ReportPage from '@components/report-page';
import Custom404 from '@pages/404.page';

const IndexPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Franchisee:
    case Roles.Admin:
      return <ReportPage />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
