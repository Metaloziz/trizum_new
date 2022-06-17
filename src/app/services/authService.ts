import instance from '@app/services/config';
import { Roles } from '@app/stores/appStore';
import {
  RequestLogin,
  RequestSMS,
  ResponseLoadMe,
  ResponseLogin,
  ResponseMe,
  ResponseSMS,
} from '@app/types/AuthTypes';
import { AxiosResponse } from 'axios';

enum Paths {
  Auth = 'api/v1/auth',
  Login = 'api/v1/login',
  SMS = 'api/v1/sms',
  Me = 'api/v1/me',
  LoadMe = 'api/v1/loadme',
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

  me: async () => {
    const res: AxiosResponse<ResponseMe> = await instance.get(Paths.Me);
    return res.data;
  },

  loadme: async () => {
    const res: AxiosResponse<ResponseLoadMe> = await instance.get(Paths.LoadMe);
    return res.data;
  },
};

export default authService;
