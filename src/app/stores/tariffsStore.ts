import { makeAutoObservable, runInAction } from 'mobx';

import tariffsService from 'app/services/tafiffService';
import { TariffsType } from 'app/types/TariffTypes';
import { getDateWithoutTime } from 'components/rate-choice/utils';

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

  filters = {
    status: '',
    lengthFrom: '',
    lengthTo: '',
    dateFrom: '',
    dateTo: '',
    input: '',
  };

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

  setFilters = (filter: any) => {
    this.filters = { ...filter };
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
    await this.getTariffs(); // крайне печально выглядит такой подход)
    // this.tariffs.map(f => this.editingEntity.id === f.id ? this.editingEntity: f);
  };

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

  get filteredTariffs() {
    let data: TariffsType[] = [...this.tariffs];
    if (this.filters.lengthFrom) {
      data = data.filter(val => +val.newPrice > +this.filters.lengthFrom);
    }
    if (this.filters.lengthTo) {
      data = data.filter(val => +val.newPrice < +this.filters.lengthTo);
    }
    if (this.filters.dateFrom) {
      data = data.filter(
        val =>
          getDateWithoutTime(new Date(val.startedAt.date)) >=
          getDateWithoutTime(new Date(this.filters.dateFrom)),
      );
    }
    if (this.filters.dateTo) {
      data = data.filter(
        val =>
          getDateWithoutTime(new Date(val.endedAt.date)) <=
          getDateWithoutTime(new Date(this.filters.dateTo)),
      );
    }
    if (this.filters.input) {
      data = data.filter(val => val.name.toLowerCase().includes(this.filters.input.toLowerCase()));
    }
    if (this.filters.status) {
      if (this.filters.status === 'all') {
        return data;
      }
      data = data.filter(val => val.status === this.filters.status);
    }
    return data;
  }
}

export default new TariffsStore();
