import { makeAutoObservable, runInAction } from 'mobx';

import { TariffsType } from '../types/TariffTypes';

import tariffService from 'app/services/tafiffService';

class TariffsStore {
  tariffs: TariffsType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTariffs = async () => {
    const res = await tariffService.getAllTariffs();
    runInAction(() => {
      this.tariffs = res;
    });
  };
}

export default new TariffsStore();
