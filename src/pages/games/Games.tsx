import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate, useParams } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import ListGames from 'components/list-games/ListGames';

type Props = Record<string, unknown>;

const Games: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return (
        <div>
          <ListGames />
        </div>
      );
    case Roles.TeacherEducation:
    case Roles.Tutor:
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Games;
