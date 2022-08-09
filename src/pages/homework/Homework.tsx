import React, { FC } from 'react';
import appStore, { Roles } from 'app/stores/appStore';

import { AppRoutes } from 'app/enums/AppRoutes';
import { HomeworkPage } from 'components/homework-page/HomeworkPage';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Homework: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <HomeworkPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Homework;
