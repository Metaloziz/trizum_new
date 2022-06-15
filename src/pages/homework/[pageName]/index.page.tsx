import React from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import HomeworkAddEditPage from '@components/homework-add-edit-page';
import Custom404 from '@pages/404.page';
import { observer } from 'mobx-react-lite';

const AddEditPage = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <HomeworkAddEditPage />;
    default:
      return <Custom404 />;
  }
});

export default AddEditPage;
