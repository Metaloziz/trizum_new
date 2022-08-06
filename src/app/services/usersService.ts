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

type UpdateUserPayloadT = Partial<ResponseUserT>;

const usersService = {
  getAllUsers: async (params?: RequestUsersParams): Promise<FullResponseUserT> => {
    const res = await instance.get(Paths.Users, {
      params: {
        page: params?.page,
        role: params?.role,
        per_page: params?.perPage,
        franchise_id: params?.franchiseId,
      },
    });
    return res.data;
  },
  getOneUser: async (id: string): Promise<ResponseOneUser> => {
    const { data } = await instance.get(`${Paths.Users}/${id}`);
    return data;
  },
  updateUser: async (newUser: UpdateUserPayloadT, userId: string): Promise<ResponseUserT> => {
    const { data } = await instance.post(`${Paths.Users}/${userId}`, newUser);
    return data;
  },
  createParenting: async (params: RequestParenting): Promise<ResponseParenting> => {
    const { data } = await instance.post(Paths.Parentings, params);
    return data;
  },
};
export default usersService;
