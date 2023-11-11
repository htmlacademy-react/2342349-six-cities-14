import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {BACKEND_REQUEST_TIMEOUT, BACKEND_URL} from '../const.ts';
import {store} from '../store';
import {setError} from '../store/action.ts';
import {getToken} from './token.ts';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: BACKEND_REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        store.dispatch(setError(detailMessage.message));
      }
      throw error;
    }
  );
  return api;
}

export {createAPI};
