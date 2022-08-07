import { makeAutoObservable, runInAction } from 'mobx';

import { TariffsType } from '../types/TariffTypes';

import tariffsService from 'app/services/tafiffService';

class TariffsStore {
  private _defaultValue = (): TariffsType => ({
    code: '',
    description: '',
    durationMonths: 0,
    endedAt: {
      date: '',
      timezone: '',
      timezone_type: 0,
    },
    forFirstPay: false,
    forNewClient: false,
    forSecondChild: true,
    id: '',
    name: '',
    newPrice: '',
    oldPrice: '',
    prevTariff: null,
    startedAt: {
      date: '',
      timezone: '',
      timezone_type: 0,
    },
    status: 'active',
  });

  tariffs: TariffsType[] = [];

  isDialogOpen: boolean = false;

  editingEntity: TariffsType = this._defaultValue();

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = (editingEntity?: TariffsType) => {
    this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  addOrEdit = async () => {
    const options: TariffsType | {} = { ...this.editingEntity };
    try {
      if (this.editingEntity.id) {
        await tariffsService.edit(this.editingEntity.id, options);
      } else {
        await tariffsService.create({ ...this.editingEntity });
      }
    } catch (e) {
      console.log(e);
    }
    this.closeDialog();
  };

  getTariffs = async () => {
    const res = await tariffsService.getAllTariffs();
    runInAction(() => {
      this.tariffs = res;
    });
  };
}

export default new TariffsStore();
