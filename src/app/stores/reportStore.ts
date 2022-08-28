import reportService from 'app/services/reportService';
import { ReportItemsT } from 'app/types/ReportT';
import { makeAutoObservable, runInAction } from 'mobx';
import { getDateWithoutTime } from '../../components/rate-choice/utils';
import moment from 'moment/moment';
import { DateTime } from '../enums/DateTime';
import groupsService from '../services/groupsService';
import { AxiosError } from 'axios';
import { ResponseGroups } from '../types/GroupTypes';

export type ReportParams = Partial<{
  perPage: number;
  page: number;
  cityName: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_active: string;
  is_payed: string;
  tariff_id: string;
  franchise_id: string;
  group_id: string;
}>;
export type ReportParamsForUI = Partial<{
  date_since: Date | string;
  date_until: Date | string;
}> &
  ReportParams;
export type ReportParamsForServer = Partial<{
  dateSince: string;
  dateUntil: string;
}> &
  ReportParams;

class ReportStore {
  items: ReportItemsT[] = [];

  groups: ResponseGroups[] = [];

  page = 0;

  perPage = 0;

  total = 0;

  isLoad = false;

  private defaultValues = {
    cityName: '',
    pupilName: '',
    isActiveStatus: '',
    isPaidStatus: '',
    dateFrom: '',
    dateTo: '',
    tariff: '',
    franchiseId: '',
  };

  private queryDefaultValues: ReportParamsForUI = {
    perPage: 10,
    page: 0,
    cityName: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    is_active: '',
    is_payed: '',
    date_since: '',
    date_until: '',
    tariff_id: '',
    franchise_id: '',
    group_id: '',
  };

  modalFields = { ...this.defaultValues };

  queryFields = { ...this.queryDefaultValues };

  constructor() {
    makeAutoObservable(this);
  }

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoad = true;
      return await action();
    } catch (e) {
      // TODO: handle error
      return (e as AxiosError).message;
    } finally {
      this.isLoad = false;
    }
  };

  getReports = async () => {
    try {
      const res = await reportService.getReports(this.queryFields);
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

  getGroups = async () => {
    const dateSince = this.defaultValues.dateFrom
      ? moment(this.defaultValues.dateFrom).format(DateTime.DdMmYyyy)
      : '';
    const dateUntil = this.defaultValues.dateTo
      ? moment(this.defaultValues.dateTo).format(DateTime.DdMmYyyy)
      : '';
    await this.execute(async () => {
      const res = await groupsService.getGroups({
        ...this.queryDefaultValues,
        dateSince,
        dateUntil,
      });
      runInAction(() => {
        this.groups = res.items;
      });
    });
  };

  // setFilters = (filter: any) => {
  //   this.defaultValues = { ...filter };
  // };
  clearQueryFields = () => {
    this.queryFields = { ...this.queryDefaultValues };
    this.getReports();
  };

  get reports() {
    // const data: ReportItemsT[] = [...this.items];
    //   if (this.queryFields?.cityName) {
    //     data = data.filter(f => f.city?.toLowerCase() === this.queryFields.cityName?.toLowerCase());
    //   }
    //   if (this.defaultValues.tariff) {
    //     data = data.filter(
    //       f => f.tariff?.name.toLowerCase() === this.defaultValues.tariff.toLowerCase(),
    //     );
    //   }
    //   if (this.defaultValues.pupilName) {
    //     data = data.filter(
    //       f =>
    //         f.firstName.toLowerCase() === this.defaultValues.pupilName.toLowerCase() ||
    //         f.middleName.toLowerCase() === this.defaultValues.pupilName.toLowerCase() ||
    //         f.lastName.toLowerCase() === this.defaultValues.pupilName.toLowerCase(),
    //     );
    //   }
    //   if (this.defaultValues.isActiveStatus) {
    //     const status = this.defaultValues.isActiveStatus === 'true';
    //     data = data.filter(f => f.isActive === status);
    //   }
    //   if (this.defaultValues.isPaidStatus) {
    //     const status = this.defaultValues.isPaidStatus === 'true';
    //     data = data.filter(f => f.isPayed === status);
    //   }
    //   if (this.defaultValues.dateTo) {
    //     data = data.filter(
    //       val =>
    //         getDateWithoutTime(new Date(val.birthdate.date)) <=
    //         getDateWithoutTime(new Date(this.defaultValues.dateTo)),
    //     );
    //   }
    //   if (this.defaultValues.dateFrom) {
    //     data = data.filter(
    //       val =>
    //         getDateWithoutTime(new Date(val.birthdate.date)) >=
    //         getDateWithoutTime(new Date(this.defaultValues.dateFrom)),
    //     );
    //   }
    return this.items
  }
}

export default new ReportStore();
