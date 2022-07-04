import { AxiosResponse } from 'axios';

import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  RequestLogin,
  RequestRegister,
  RequestSMS,
  ResponseLoadMe,
  ResponseLogin,
  ResponseMe,
  ResponseSMS,
} from 'app/types/AuthTypes';

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
  register: async (data: RequestRegister) => {
    const res: AxiosResponse<any> = await instance.post(Paths.Register, data);
    return res.data;
  },
};

export default authService;
