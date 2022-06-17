/* ts-ignore */
import axios, { AxiosRequestConfig } from 'axios';

import TokenService from './tokenService';

const instance = axios.create({
  baseURL: 'https://backschool.sitetopic.ru/',
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  (config: AxiosRequestConfig<{ headers: { 'Content-Type': string } }>) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // @ts-ignore
      config.headers.Authorization = token; // for Node.js Express back-end
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
    }
    return config;
  },
  error => Promise.reject(error),
);
instance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;
    if (originalConfig.url !== '/auth/signin' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post('/auth/refreshtoken', {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);
export default instance;
