import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import SchedulePage from '@components/schedule-page/SchedulePage';
import Custom404 from '@pages/404.page';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
    case Roles.Methodist:
      return <SchedulePage />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
