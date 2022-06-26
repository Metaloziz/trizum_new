import { Paths } from '@app/enums/Paths';
import instance from '@app/services/config';
import { AxiosResponse } from 'axios';

type ResponseGroup = { id: string; code: string; franchise: string };

const groupsService = {
  getGroups: async () => {
    const res: AxiosResponse<ResponseGroup[]> = await instance.get(Paths.Groups);
    return res.data;
  },
};
export default groupsService;
