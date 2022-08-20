import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ReportItemsT } from 'app/types/ReportT';
import { WithPagination } from 'app/types/WithPagination';

const reportService = {
  getReport: async (): Promise<WithPagination<ReportItemsT[]>> => {
    const { data } = await instance.get(Paths.Report);
    return data;
  },
};

export default reportService;
