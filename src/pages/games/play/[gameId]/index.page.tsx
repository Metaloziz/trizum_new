import React, { FC } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import GamePage from '@components/game-page';
import Custom404 from '@pages/404.page';
import { observer } from 'mobx-react-lite';

type Props = Record<string, unknown>;

const PlayPage: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return <GamePage />;
    case Roles.TeacherEducation:
    case Roles.Tutor:
    default:
      return <Custom404 />;
  }
});

export default PlayPage;
