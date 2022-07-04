import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  FullResponseUserT,
  RequestParenting,
  RequestUsersParams,
  ResponseOneUser,
  ResponseParenting,
  ResponseUserT,
} from 'app/types/UserTypes';

const usersService = {
  getAllUsers: async (params?: RequestUsersParams): Promise<FullResponseUserT> => {
    const { data } = await instance.get(Paths.Users, {
      params: { ...params, per_page: params?.perPage },
    });
    return data;
  },
  getOneUser: async (id: string): Promise<ResponseOneUser> => {
    const { data } = await instance.get(`${Paths.Users}/${id}`);
    return data;
  },
  updateUser: async (): Promise<ResponseUserT> => {
    const { data } = await instance.put(Paths.Users);
    return data;
  },
  createParenting: async (params: RequestParenting): Promise<ResponseParenting> => {
    const { data } = await instance.post(Paths.Parentings, params);
    return data;
  },
};
export default usersService;
