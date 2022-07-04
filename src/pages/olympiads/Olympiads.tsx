import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import OlympiadsPage from 'components/olympiads-page';

const Olympiads: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <OlympiadsPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Olympiads;
