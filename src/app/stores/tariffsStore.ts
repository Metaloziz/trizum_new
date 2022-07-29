import { makeAutoObservable, runInAction } from 'mobx';

import { TariffsType } from '../types/TariffTypes';

import tariffService from 'app/services/tafiffService';

class TariffsStore {
  private _defaultValue = (): any => ({
    code: '',
    description: '',
    durationMonths: 0,
    endedAt: '',
    forFirstPay: false,
    forNewClient: false,
    forSecondChild: true,
    id: '',
    name: '',
    newPrice: '',
    oldPrice: '',
    prevTariff: null,
    startedAt: '',
    status: 'active',
  });

  tariffs: TariffsType[] = [];

  isDialogOpen: boolean = false;

  editingEntity: any = this._defaultValue();

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = () => {
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  getTariffs = async () => {
    const res = await tariffService.getAllTariffs();
    runInAction(() => {
      this.tariffs = res;
    });
  };
}

export default new TariffsStore();
