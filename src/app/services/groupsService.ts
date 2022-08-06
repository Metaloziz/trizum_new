import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { CreateGroup, GroupParams, ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';
import { WithPagination } from 'app/types/WithPagination';

const groupsService = {
  getGroups: async (params?: GroupParams): Promise<WithPagination<ResponseGroups[]>> => {
    const actualParams = {
      per_page: params?.perPage || undefined,
      page: params?.page || undefined,
      for_group_id: params?.forGroupId || undefined,
      date_since: params?.dateSince || undefined,
      date_until: params?.dateUntil || undefined,
      franchise_id: params?.franchiseId || undefined,
      level:params?.level || undefined,
      name: params?.name || undefined,
      teacher_id: params?.teacherId || undefined,
      type: params?.type || undefined,
    }
    const res = await instance.get(Paths.Groups, {
      params: actualParams,
    });
    return res.data;
  },
  getOneGroup: async (id: string): Promise<ResponseOneGroup> => {
    const { data } = await instance.get(`${Paths.Groups}/${id}`);
    return data;
  },
  addGroup: async (group: CreateGroup) => {
    const { data } = await instance.post(`${Paths.Groups}`, group);
    return data;
  },
};
export default groupsService;
