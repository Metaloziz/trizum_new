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

  openDialog = (editingEntity?: any) => {
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
        await tariffService.edit(this.editingEntity.id, options);
      } else {
        await tariffService.create({ ...this.editingEntity });
      }
    } catch (e) {
      console.log(e);
    }
    this.closeDialog();
  };

  getTariffs = async () => {
    const res = await tariffService.getAllTariffs();
    runInAction(() => {
      this.tariffs = res;
    });
  };
}

export default new TariffsStore();
