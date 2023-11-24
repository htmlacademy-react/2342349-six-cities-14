import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const.ts';
import {handleApiError} from '../../services/api-error-handler.ts';
import {dropToken, saveToken} from '../../services/token.ts';
import {AuthData} from '../../types/auth-data.ts';
import {UserData} from '../../types/user-data.ts';
import {ThunkApiConfig} from '../state.ts';

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  'user/checkAuthAction',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.GetLogin);
  },
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  ThunkApiConfig
>(
  'user/loginAction',
  async ({login: email, password}, {extra: api, rejectWithValue}) => {
    try {
      const response = await api.post<UserData>(APIRoute.PostLogin, {email, password});
      const token = response.data?.token ?? '';
      saveToken(token);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  'user/logoutAction',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      await api.delete(APIRoute.DeleteLogout);
      dropToken();
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
