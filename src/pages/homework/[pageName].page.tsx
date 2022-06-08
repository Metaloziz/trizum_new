import React from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

const AddEditPage = () => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <div>add edit hw</div>;
    default:
      return <Custom404 />;
  }
};

export default AddEditPage;
