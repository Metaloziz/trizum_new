import instance from '@app/services/config';
import { Roles } from '@app/stores/appStore';
import { AxiosResponse } from 'axios';

type RequestSMS = { phone: string };
type RequestLogin = { phone: string; smsCode: number };

type ResponseSMS = { code: number };
type ResponseLogin = {
  result: {
    response: string;
  };
  data: {
    token: string;
    id: string;
  };
};
type ResponseMe = {
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

enum Paths {
  Auth = 'api/v1/auth',
  Login = 'api/v1/auth',
  SMS = 'api/v1/sms',
  Me = 'api/v1/me',
}

const authService = {
  authenticate: async (data: any) => {
    const res = await instance.post(Paths.Auth, data);
    return res.data;
  },
  login: async (data: RequestLogin) => {
    const res: AxiosResponse<ResponseLogin> = await instance.post(Paths.Login, data);
    return res.data;
  },
  sms: async (data: RequestSMS) => {
    const res: AxiosResponse<ResponseSMS> = await instance.post(Paths.SMS, data);
    return res.data;
  },
  me: async (token: string) => {
    const res: AxiosResponse<ResponseMe> = await instance.post(
      Paths.Me,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res.data;
  },
};

export default authService;
