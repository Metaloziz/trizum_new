import { observer } from 'mobx-react-lite';
import React from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import PageSettingGames from '@components/page-setting-games/PageSettingGames';
import Custom404 from '@pages/404.page';

const EditGame = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <PageSettingGames />;
    default:
      return <Custom404 />;
  }
});

export default EditGame;
