import { Roles } from 'app/stores/appStore';

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
  phone: string;
  role: string;
};

export type TimeZoneType = {
  date: string;
  timezone_type: number;
  timezone: string;
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
  birthdate: TimeZoneType;
  sex: null | string;
  status: string;
  avatar: {
    id: string;
    path: string;
  };
};

export type RequestRegister = {
  phone?: string;
  email?: string;
  role: Roles;
  franchiseId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  birthdate: string;
  sex: boolean; // todo мы везде используем такой тип - Option | undefined - может заменить ?
  groupId?: string;
  tariffId?: string;
  isSecondChild?: boolean;
};

export type ResponseAvatar = {
  image: string;
};

export type ResponseEditSelf = {
  phone: string;
  smsCode: number;
  email: string;
};
