import React from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import ClassesPage from 'components/classes-page/ClassesPage';

const Classes = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.Admin:
      return <ClassesPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Classes;
