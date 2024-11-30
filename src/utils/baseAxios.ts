import axios, { isAxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { storage } from '../lib/storage';
import { refreshMe } from '../services/getMe';
import { queryClient } from './queryClient';

const requestInterceptor = <T1, T2 extends InternalAxiosRequestConfig<T1>>(config: T2): T2 => {
  const headers: AxiosRequestHeaders = config.headers || {};
  const me = storage.get('me');
  if (me) {
    headers.Authorization = `Bearer ${me.tokens.accessToken}`;
  }
  headers['x-city-id'] = 'bishkek';
  headers['x-country-id'] = 'kyrgyzstan';
  return { ...config, headers };
};

const errorResponseInterceptor = async (error: unknown): Promise<AxiosResponse<unknown, unknown>> => {
  if (isAxiosError(error) && error.response?.status === 401) { //! Unauthorized
    try {
      const me = await refreshMe();
      // const { data } = await baseAxiosAnon.post<Tokens>('/auth/refresh/', null, {
      //   headers: {
      //     'Authorization': `Bearer ${me.tokens.refreshToken}`,
      //   }
      // });

      storage.set('me', me);
      queryClient.setQueryData(['me'], me);
      const config: AxiosRequestConfig<unknown> = {
        ...error.config,
        headers: {
          ...(error.config?.headers ?? {}),
          Authorization: `Bearer ${me.tokens.accessToken}`,
        }
      }

      return await axios(config);
    } catch (_) {
      storage.set('me', null);
      queryClient.setQueryData(['me'], null);
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};

export const baseAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'x-country-id': 'kyrgyzstan',
    'x-city-id': 'bishkek',
  },
});

export const baseAxiosAnon = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'x-country-id': 'kyrgyzstan',
    'x-city-id': 'bishkek',
  },
});

baseAxios.interceptors.request.use(requestInterceptor, error => Promise.reject(error));
baseAxios.interceptors.response.use(async (resp) => Promise.resolve(resp), errorResponseInterceptor);