import React from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

const EditGame = () => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <div>game edit</div>;
    default:
      return <Custom404 />;
  }
};

export default EditGame;
