import { Paths } from '@app/enums/Paths';
import instance from '@app/services/config';

type ResponseUserT = {
  id: string;
  email: string;
  phone: string;
  role: string;
};
type RequestUserT = {};

const usersService = {
  getAllUsers: async (): Promise<ResponseUserT[]> => {
    const { data } = await instance.get(Paths.Users);
    return data;
  },
  getOneUser: async (): Promise<ResponseUserT> => {
    const { data } = await instance.get(Paths.Users);
    return data;
  },
  createUser: async (): Promise<ResponseUserT> => {
    const { data } = await instance.post(Paths.Users);
    return data;
  },
  updateUser: async (): Promise<ResponseUserT> => {
    const { data } = await instance.put(Paths.Users);
    return data;
  },
};
