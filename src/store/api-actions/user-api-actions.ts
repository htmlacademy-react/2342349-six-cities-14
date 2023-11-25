import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const.ts';
import {handleApiError} from '../../services/api-error-handler.ts';
import {dropToken, saveToken} from '../../services/token.ts';
import {AuthDataRequest} from '../../types/auth-data-request.ts';
import {AuthDataResponse} from '../../types/auth-data-response.ts';
import {ThunkApiConfig} from '../state.ts';
import {setUserAvatarUrl, setUserLogin} from '../user-preferences/user-preferences.slice.ts';

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  'user/checkAuthAction',
  async (_arg, {extra: api, dispatch}) => {
    const response = await api.get<AuthDataResponse>(APIRoute.GetLogin);
    const userLogin = response.data?.email;
    const userAvatarUrl = response.data?.avatarUrl;
    dispatch(setUserLogin(userLogin));
    dispatch(setUserAvatarUrl(userAvatarUrl));
  },
);

export const loginAction = createAsyncThunk<
  void,
  AuthDataRequest,
  ThunkApiConfig
>(
  'user/loginAction',
  async ({login: email, password}, {extra: api, dispatch, rejectWithValue}) => {
    try {
      const response = await api.post<AuthDataResponse>(APIRoute.PostLogin, {email, password});
      const token = response.data?.token ?? '';
      const userLogin = response.data?.email;
      const userAvatarUrl = response.data?.avatarUrl;
      saveToken(token);
      dispatch(setUserLogin(userLogin));
      dispatch(setUserAvatarUrl(userAvatarUrl));
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
