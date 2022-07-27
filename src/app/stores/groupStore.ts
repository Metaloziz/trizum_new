import { makeAutoObservable, runInAction } from 'mobx';

import groupsService from 'app/services/groupsService';
import { GroupsItemsType, ResponseGroupType } from 'app/types/GroupTypes';

class GroupStore {
  groups: GroupsItemsType[] = [];

  currentGroup?: ResponseGroupType;

  constructor() {
    makeAutoObservable(this);
  }

  getGroups = async () => {
    try {
      const res = await groupsService.getGroups();
      await this.getOneGroup(res.items[0].id);
      runInAction(() => {
        this.groups = res.items;
      });
      return res.items;
    } catch (e) {
      console.warn(e);
    }
    return [] as GroupsItemsType[];
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
