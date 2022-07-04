import { makeAutoObservable, runInAction } from 'mobx';

import groupsService from 'app/services/groupsService';
import { ResponseGroup } from 'app/types/GroupTypes';

class GroupStore {
  groups: ResponseGroup[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getGroups = async () => {
    try {
      const res = await groupsService.getGroups();
      runInAction(() => {
        this.groups = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return [] as ResponseGroup[];
  };
}
export default new GroupStore();
