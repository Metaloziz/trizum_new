import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import RateAddEditPage from '@components/rate-add-edit-page';
import Custom404 from '@pages/404.page';

const AddPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
      return <RateAddEditPage />;
    default:
      return <Custom404 />;
  }
});

export default AddPage;
