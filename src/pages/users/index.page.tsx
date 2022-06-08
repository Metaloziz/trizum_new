import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

const IndexPage: FC = () => {
  switch (appStore.role) {
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
    case Roles.Tutor:
      return <div>users</div>;
    default:
      return <Custom404 />;
  }
};

export default IndexPage;
