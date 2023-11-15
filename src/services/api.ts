import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {BACKEND_REQUEST_TIMEOUT, BACKEND_URL} from '../const.ts';
import {store} from '../store';
import {setError} from '../store/action.ts';
import {getToken} from './token.ts';

type DetailMessage = {
  type: string;
  message: string;
  details?: {
    messages: string[];
  }[];
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
    (error: AxiosError<DetailMessage>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const { message, details } = error.response.data;
        const additionalMessages = details?.map((detail) => detail.messages.join(' ')).join(' ') ?? '';
        const errorMessage = additionalMessages ? `${message} ${additionalMessages}` : message;
        store.dispatch(setError(errorMessage.trim()));
      }
      throw error;
    }
  );

  return api;
}

export {createAPI};
