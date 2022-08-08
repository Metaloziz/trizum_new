import { Roles } from 'app/stores/appStore';
import { TimeZoneType } from 'app/types/AuthTypes';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { WithPagination } from 'app/types/WithPagination';

export type RequestUsersParams = {
  role?: Roles;
  page?: number;
  perPage?: number;
  franchiseId?: string;
};

export type RequestCreateUser = {
  role: string;
  franchiseId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  birthdate: string;
  sex: boolean | null;
  phone: string | null;
  email: string | null;
};

export type ResponseOneUserGroupT = {
  userGroupId: string;
  groupId: string;
  groupCode: string;
  groupType: null | string;
};

export type ResponseUserT = {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phone: string | null;
  email: string | null;
  roleCode: Roles;
  franchise: FranchiseT | null;
  city: string | null;
  groups: ResponseOneUserGroupT[];
  status: UserStatusT;
  avatar: any | null; // todo определить тип объекта
};
export type FullResponseUserT = WithPagination<ResponseUserT[]>;

export type UserStatusT = 'active' | 'blocked' | 'payed' | 'notPayed';

export type ParentT = {
  parentingId: string;
  isMain: boolean;
  parent: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: null;
    role: string;
    sex: boolean;
    birthdate: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    city: string;
    phone: string;
    email: string;
  };
};

export type ResponseOneUser = {
  birthdate: TimeZoneType;
  sex: boolean | null; // male - true
  createdAt: TimeZoneType;
  groups: ResponseOneUserGroupT[];
  parents: ParentT[];
  tariff: null | any;
  payedUntill: null | any;
  isSecondChild: null | boolean;
} & ResponseUserT;

export type RequestParenting = {
  parentId: string;
  childId: string;
  isMain: boolean;
};

export type ResponseParenting = {
  id: string;
  childId: string;
  parentId: string;
};
