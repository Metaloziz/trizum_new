import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ResponseGroupsType, ResponseGroupType } from 'app/types/GroupTypes';

const groupsService = {
  getGroups: async (): Promise<ResponseGroupsType> => {
    const { data } = await instance.get(Paths.Groups);
    return data;
  },
  getOneGroup: async (id: string): Promise<ResponseGroupType> => {
    const { data } = await instance.get(`${Paths.Groups}/${id}`);
    return data;
  },
};
export default groupsService;
