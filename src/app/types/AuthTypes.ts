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
  phone: string;
  role: string;
};

// export type ResponseLoadMe = {
//   id: string;
//   firstName: string;
//   middleName: null | string;
//   lastName: string;
//   email: string;
//   phone: string;
//   role: string;
//   franchise: null | string;
//   city: null | string;
//   birthdate: null | string;
//   sex: null | boolean;
//   balance: string;
// };

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
  birthdate: {
    date: string;
    timezone_type: string;
    timezone: string;
  };
  sex: null | string;
  status: string;
  avatar: {
    id: string;
    path: string;
  };
};
