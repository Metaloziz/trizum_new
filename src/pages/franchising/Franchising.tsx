import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import FranchisingPage from 'components/franchising-page/FranchisingPage';

const Franchising: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
    case Roles.Tutor:
      return <FranchisingPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Franchising;
