import { Roles } from '@app/stores/appStore';

export type RequestSMS = { phone: string };
export type RequestLogin = { phone: string; smsCode: number };

export type ResponseSMS = { code: number };
export type ResponseLogin = {
  result: {
    response: string;
  };
  data: {
    token: string;
    id: string;
  };
};
export type ResponseMe = {
  id: string;
  email: string;
  roles: string;
  lastSession: string;
  phone: string;
  images: string[];
  userAchievements: string[];
  franchisee: string;
  picture: null;
  firstName: string;
  middleName: null;
  lastName: string;
  city: string | null;
  birthdate: string;
  sex: boolean;
  statusCode: string | null;
  statusName: string | null;
  roleCode: Roles;
  roleName: string;
  created: string;
  secondChild: string | null;
  balance: string;
};

export type ResponseLoadMe = {
  id: string;
  firstName: string;
  middleName: null | string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  franchise: null | string;
  city: null | string;
  birthdate: null | string;
  sex: null | string;
  balance: string;
};
