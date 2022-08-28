import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ReportItemsT } from 'app/types/ReportT';
import { WithPagination } from 'app/types/WithPagination';
import { ReportParamsForUI } from '../stores/reportStore';
import { GroupParamsForServer } from '../types/GroupTypes';

const reportService = {
  getReport: async (): Promise<WithPagination<ReportItemsT[]>> => {
    const { data } = await instance.get(Paths.Report);
    return data;
  },
  getReports: async (payload: ReportParamsForUI): Promise<WithPagination<ReportItemsT[]>> => {
    const paramsCreator = (data?: ReportParamsForUI) => {
      if (data) {
        for (const key in data) {
          // @ts-ignore
          if (data[key] === '') data[key] = undefined;
        }
      }
      return data;
    };
    const params = paramsCreator(payload);
    const actualParams = {
      per_page: params?.perPage || undefined,
      page: params?.page || undefined,
      group_id: params?.group_id || undefined,
      created_since: params?.date_since || undefined,
      created_until: params?.date_until || undefined,
      franchise_id: params?.franchise_id || undefined,
      first_name: params?.first_name || undefined,
      last_name: params?.last_name || undefined,
      tariff_id: params?.tariff_id || undefined,
      is_active: params?.is_active || undefined,
      is_payed: params?.is_payed || undefined,
      city: params?.cityName || undefined,
    };
    const { data } = await instance.get(Paths.Report, {
      params: actualParams,
    });
    return data;
  },
};

export default reportService;
