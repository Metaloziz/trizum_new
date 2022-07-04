import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import RateAddEditPage from 'components/rate-add-edit-page';
import TariffPage from 'components/tariff-page/TariffPage';
import Custom404 from 'pages/404.page';

const AddPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
      // return <RateAddEditPage />;
      return <TariffPage />;
    default:
      return <Custom404 />;
  }
});

export default AddPage;
