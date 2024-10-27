import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createEventSource, EventSourceOptions } from 'eventsource-client';
import Cookies from 'js-cookie';

import { ApiError } from '@/utils/core/apiErrors';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use(
  async (config) => {
    const sessionToken = Cookies.get('stytch_session');
    config.params = { ...config.params, sessionToken: sessionToken };

    const m2mToken = await axios.get('/api/auth/m2m');
    config.headers.Authorization = `Bearer ${m2mToken.data.m2mToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// detects invalid authorization in API call
// result of invalid session tokens (from revokation)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401)
      return (window.location.href = '/auth/login');
    return Promise.reject(error);
  }
);

const nextApi = axios.create({
  baseURL: '',
});

export const fetchData = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.request<T>({
      url,
      method,
      data: body,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw ApiError.fromAxiosError(error);
  }
};

export const fetchDataNext = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await nextApi.request<T>({
      url,
      method,
      data: body,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw ApiError.fromAxiosError(error);
  }
};

export const createStream = async (
  url: string,
  opts?: Omit<EventSourceOptions, 'url'>
) => {
  const sessionToken = Cookies.get('stytch_session');
  const m2mToken = await axios.get('/api/auth/m2m');

  // TODO: reconnect is absurdly broken here
  let n = 5;
  const stream = createEventSource({
    ...opts,
    onScheduleReconnect() {
      if (n <= 0) {
        console.warn(`could not reconnect after ${n} attempts, closing stream`);
        stream.close();
      }
      n -= 1;
    },
    url: `${BACKEND_URL}${url}?sessionToken=${sessionToken}`,
    headers: {
      ...opts?.headers,

      Authorization: `Bearer ${m2mToken.data.m2mToken}`,
    },
  });

  return stream;
};
