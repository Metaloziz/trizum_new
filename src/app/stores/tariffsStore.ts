import { makeAutoObservable, runInAction } from 'mobx';

import tariffsService from 'app/services/tafiffService';
import { TariffsType } from 'app/types/TariffTypes';

class TariffsStore {
  tariffs: TariffsType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTariffs = async () => {
    try {
      const res = await tariffsService.getAllTariffs();
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
