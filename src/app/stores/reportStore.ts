import reportService from 'app/services/reportService';
import { ReportItemsT } from 'app/types/ReportT';
import { makeAutoObservable, runInAction } from 'mobx';
import { getDateWithoutTime } from '../../components/rate-choice/utils';

class ReportStore {
  items: ReportItemsT[] = [];

  page = 0;

  perPage = 0;

  total = 0;

  filters = {
    cityName: '',
    pupilName: '',
    isActiveStatus: '',
    isPaidStatus: '',
    dateFrom: '',
    dateTo: '',
    tariff: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  getReport = async () => {
    try {
      const res = await reportService.getReport();
      runInAction(() => {
        this.items = res.items;
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    } catch (e) {
      console.warn(e);
    }
  };

  setFilters = (filter: any) => {
    this.filters = { ...filter };
  };

  get reports() {
    let data: ReportItemsT[] = [...this.items];
    if (this.filters.cityName) {
      data = data.filter(f => f.city?.toLowerCase() === this.filters.cityName.toLowerCase());
    }
    if (this.filters.tariff) {
      data = data.filter(f => f.tariff?.name.toLowerCase() === this.filters.tariff.toLowerCase());
    }
    if (this.filters.pupilName) {
      data = data.filter(
        f =>
          f.firstName.toLowerCase() === this.filters.pupilName.toLowerCase() ||
          f.middleName.toLowerCase() === this.filters.pupilName.toLowerCase() ||
          f.lastName.toLowerCase() === this.filters.pupilName.toLowerCase(),
      );
    }
    if (this.filters.isActiveStatus) {
      const status = this.filters.isActiveStatus === 'true';
      data = data.filter(f => f.isActive === status);
    }
    if (this.filters.isPaidStatus) {
      const status = this.filters.isPaidStatus === 'true';
      data = data.filter(f => f.isPayed === status);
    }
    if (this.filters.dateTo) {
      data = data.filter(
        val =>
          getDateWithoutTime(new Date(val.birthdate.date)) <=
          getDateWithoutTime(new Date(this.filters.dateTo)),
      );
    }
    if (this.filters.dateFrom) {
      data = data.filter(
        val =>
          getDateWithoutTime(new Date(val.birthdate.date)) >=
          getDateWithoutTime(new Date(this.filters.dateFrom)),
      );
    }
    return data;
  }
}

export default new ReportStore();
