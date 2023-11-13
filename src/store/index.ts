import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api.ts';
import {dataReducer} from './dataReducer.ts';

const api = createAPI();

export const store = configureStore({
  reducer: {
    data: dataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
