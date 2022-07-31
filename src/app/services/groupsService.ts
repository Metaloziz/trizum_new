import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';
import {WithPagination} from "app/types/WithPagination";

const groupsService = {
  getGroups: async (): Promise<WithPagination<ResponseGroups[]>> => {
    const res = await instance.get(Paths.Groups);
    return res.data;
  },
  getOneGroup: async (id: string): Promise<ResponseOneGroup> => {
    const { data } = await instance.get(`${Paths.Groups}/${id}`);
    return data;
  },
};
export default groupsService;
