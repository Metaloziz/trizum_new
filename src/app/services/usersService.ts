import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { UpdateUserPayloadT } from 'app/types/UpdateUserPayloadT';
import {
  FullResponseUserT,
  RequestParenting, RequestUsersForFilter,
  RequestUsersParams,
  ResponseOneUser,
  ResponseParenting,
  ResponseUserT,
} from 'app/types/UserTypes';

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
  getUsersForFilters: async (params?: RequestUsersForFilter): Promise<FullResponseUserT> => {
    const res = await instance.get(Paths.Users, {
      params: {
        page: params?.page || undefined,
        role: params?.role || undefined,
        per_page: params?.perPage || undefined,
        franchise_id: params?.franchiseId || undefined,
        first_name: params?.firstName || undefined || null,
        middle_name: params?.middleName || undefined || null,
        last_name: params?.lastName || undefined ||null,
        city: params?.city || undefined,
        birthdate: params?.birthdate || undefined,
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
