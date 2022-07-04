import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import HomeworkList from 'components/homework-list/HomeworkList';

const Homework: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <HomeworkList />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Homework;
