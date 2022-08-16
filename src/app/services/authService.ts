import { AxiosResponse } from 'axios';

import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  RequestLogin,
  RequestRegister,
  RequestSMS,
  ResponseLogin,
  ResponseMe,
  ResponseSMS,
  ResponseAvatar,
  ResponseEditSelf,
  RequestSwitchUser,
} from 'app/types/AuthTypes';
import { ResponseLoadMeBaseT } from 'app/types/ResponseLoadMeBaseT';

const authService = {
  authenticate: async (data: any) => {
    const res = await instance.post(Paths.Auth, data);
    return res.data;
  },

  login: async (data: RequestLogin) => {
    const res: AxiosResponse<ResponseLogin> = await instance.post(Paths.Login, data, {
      // withCredentials: true,
    });
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

  loadme: async (): Promise<ResponseLoadMeBaseT> => {
    const res: AxiosResponse<ResponseLoadMeBaseT> = await instance.get(Paths.LoadMe);
    return res.data;
  },
  register: async (params: RequestRegister) => {
    const { data }: AxiosResponse = await instance.post(Paths.Register, params);
    return data;
  },
  avatar: async (params: ResponseAvatar) => {
    const { data } = await instance.post(Paths.Avatar, params);
    return data;
  },
  editSelf: async (params: ResponseEditSelf) => {
    const { data } = await instance.post(Paths.EditSelf, params);
    return data;
  },
  switchUser: async (params: RequestSwitchUser) => {
    const { data }: ResponseLogin = await instance.post(Paths.SwitchUser, params);
    return data;
  },
};

export default authService;
