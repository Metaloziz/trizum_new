import { AxiosResponse } from 'axios';

import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ResponseGroup } from 'app/types/GroupTypes';

const groupsService = {
  getGroups: async () => {
    const res: AxiosResponse<ResponseGroup[]> = await instance.get(Paths.Groups);
    return res.data;
  },
};
export default groupsService;
