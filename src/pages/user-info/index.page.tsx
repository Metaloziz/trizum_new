import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import UserPage from '@components/user-page';
import Custom404 from '@pages/404.page';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
    case Roles.Methodist:
    case Roles.Tutor:
      return <UserPage />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
