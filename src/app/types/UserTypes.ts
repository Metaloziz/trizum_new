import { Roles } from 'app/stores/appStore';
import { TimeZoneType } from 'app/types/AuthTypes';

export type RequestUsersParams = {
  role?: Roles;
  page?: string | number;
  perPage?: string;
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

export type FranchiseT = {
  id: string;
  shortName: string;
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
  avatar: any | null; // obj
};

export type FullResponseUserT = {
  page: string;
  perPage: string;
  total: number;
  items: ResponseUserT[];
};

type UserStatusT = 'active';

export type ResponseOneUser = {
  birthdate: TimeZoneType;
  sex: boolean | null;
  createdAt: TimeZoneType;
  groups: ResponseOneUserGroupT[];
  parents: any[];
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
