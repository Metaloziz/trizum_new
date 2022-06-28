import { Paths } from '@app/enums/Paths';
import instance from '@app/services/config';

export type FranchiseT = {
  id: string;
  shortName: string;
};

export type GroupT = {
  userGroupId: string;
  groupId: string;
  groupCode: string;
  groupType: string | null;
};

export type ResponseUserT = {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phone: string | null;
  email: string | null;
  roleCode: string;
  franchise: FranchiseT | null;
  city: string | null;
  groups: GroupT[];
  status: string;
  avatar: any | null; // obj
};

export type FullResponseUserT = {
  page: number;
  perPage: number;
  total: number;
  items: ResponseUserT[];
};

type RequestUserT = {};

const usersService = {
  getAllUsers: async (): Promise<FullResponseUserT> => {
    const { data } = await instance.get(Paths.Users);
    return data;
  },
  getOneUser: async (): Promise<ResponseUserT> => {
    const { data } = await instance.get(Paths.Users);
    return data;
  },
  updateUser: async (): Promise<ResponseUserT> => {
    const { data } = await instance.put(Paths.Users);
    return data;
  },
};
export default usersService;
