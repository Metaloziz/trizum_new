import reportService from 'app/services/reportService';
import { ReportFilterT, ReportItemsT } from 'app/types/ReportT';
import { makeAutoObservable, runInAction } from 'mobx';

class ReportStore {
  items: ReportItemsT[] = [];

  page = 0;

  perPage = 0;

  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getReport = async () => {
    try {
      // const res = await reportService.getReport(payload);
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
}

export default new ReportStore();
