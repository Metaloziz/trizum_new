import React, { createContext } from 'react';

import { Roles } from 'app/stores/appStore';

export function createStores() {
  return { role: Roles.Unauthorized };
}

export const stores = createStores();

export const AppCtx = createContext(stores);

export const useAppContext = () => React.useContext(AppCtx);
