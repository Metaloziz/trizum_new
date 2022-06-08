import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = () => {
  switch (appStore.role) {
    case Roles.Admin:
    case Roles.Methodist:
      return <div>schedule</div>;
    default:
      return <Custom404 />;
  }
};

export default IndexPage;
