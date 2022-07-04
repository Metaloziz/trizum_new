import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import OlympiadPage from 'components/olympiad-page/OlympiadPage';
import Custom404 from 'pages/404.page';

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
