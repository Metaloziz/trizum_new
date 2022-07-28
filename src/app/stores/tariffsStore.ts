import { makeAutoObservable, runInAction } from 'mobx';

import groupsService from 'app/services/groupsService';
import tariffsService, { ResponseTariffType } from 'app/services/tariffsService';
import { GroupsItemsType, ResponseGroupType } from 'app/types/GroupTypes';

class TariffsStore {
  tariffs: ResponseTariffType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTariffs = async () => {
    try {
      const res = await tariffsService.getAll();
      runInAction(() => {
        this.tariffs = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };
}
export default new TariffsStore();
