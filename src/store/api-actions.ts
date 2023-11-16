import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AuthorizationStatus} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AuthData} from '../types/auth-data.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {AppDispatch, State} from '../types/state.ts';
import {UserData} from '../types/user-data.ts';
import {setAuthorizationStatus, setLoadingInProgress, setOffers} from './action.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingInProgress(true));
    const {data} = await api.get<BriefOffer[]>(APIRoute.GetOffers);
    dispatch(setOffers(data));
    dispatch(setLoadingInProgress(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingInProgress(true));
    try {
      await api.get(APIRoute.GetLogin);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
    dispatch(setLoadingInProgress(false));
  },
);

export const loginAction = createAsyncThunk<
  { success: boolean },
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    dispatch(setLoadingInProgress(true));
    try {
      const response = await api.post<UserData>(APIRoute.PostLogin, {email, password});
      const token = response.data?.token ?? '';
      saveToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setLoadingInProgress(false));
      return {success: true, token};
    } catch {
      dispatch(setLoadingInProgress(false));
      return {success: false};
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingInProgress(true));
    await api.delete(APIRoute.DeleteLogout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setLoadingInProgress(false));
  },
);
