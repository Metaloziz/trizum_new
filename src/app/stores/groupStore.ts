import { makeAutoObservable, runInAction } from 'mobx';

import groupsService from 'app/services/groupsService';
import { ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';

class GroupStore {
  groups: ResponseGroups[] = [];

  currentGroup?: ResponseOneGroup;

  constructor() {
    makeAutoObservable(this);
  }

  getGroups = async () => {
    try {
      const res = await groupsService.getGroups();
      await this.getOneGroup(res[0].id);
      runInAction(() => {
        this.groups = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return [] as ResponseGroups[];
  };

  getOneGroup = async (id: string) => {
    try {
      const res = await groupsService.getOneGroup(id);
      runInAction(() => {
        this.currentGroup = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };
}
export default new GroupStore();
