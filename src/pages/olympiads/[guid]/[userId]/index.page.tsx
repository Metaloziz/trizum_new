import React, { FC } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import OlympiadsListPage from '@components/olympiads-list-page/OlympiadsListPage';
import Custom404 from '@pages/404.page';
import { observer } from 'mobx-react-lite';
import OlympiadPage from "@components/olympiad-page/OlympiadPage";

const IndexPage: FC = observer(() => {
  const { role } = appStore;
  switch (role) {
    case Roles.Student:
      return <OlympiadPage />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
