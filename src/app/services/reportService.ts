import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ReportFilterT, ReportItemsT } from 'app/types/ReportT';
import { WithPagination } from 'app/types/WithPagination';

const reportService = {
  getReport: async (): Promise<WithPagination<ReportItemsT[]>> => {
    const { data } = await instance.get(Paths.Report);
    return data;
  },
  getReports: async (payload: ReportFilterT): Promise<WithPagination<ReportItemsT[]>> => {
    const {
      page,
      perPage,
      createdUntil,
      createdSince,
      firstName,
      lastName,
      middleName,
      groupId,
      isActive,
      isPlayed,
      tariffId,
      franchiseId,
    } = payload;
    const { data } = await instance.get(Paths.Report, {
      params: {
        page,
        per_page: perPage,
        created_until: createdUntil,
        created_since: createdSince,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        group_id: groupId,
        is_active: isActive,
        is_played: isPlayed,
        tariff_id: tariffId,
        franchise_id: franchiseId,
      },
    });
    return data;
  },
};

export default reportService;
