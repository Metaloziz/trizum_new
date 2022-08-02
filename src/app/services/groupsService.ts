import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { CreateGroup, GroupParams, ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';
import { WithPagination } from 'app/types/WithPagination';

export type AddUserGroupPayloadType = {
  userId: string;
  groupId: string;
};

const groupsService = {
  getGroups: async (params?: GroupParams): Promise<WithPagination<ResponseGroups[]>> => {
    const res = await instance.get(Paths.Groups, {
      params: {
        per_page: params?.perPage,
        page: params?.page,
        franchise_id: params?.franchise_id,
        type: params?.type,
      },
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

  addUserGroup: async (addGroupData: AddUserGroupPayloadType) => {
    const { data } = await instance.post(`${Paths.UserGroups}`, addGroupData);
    return data;
  },
};
export default groupsService;
