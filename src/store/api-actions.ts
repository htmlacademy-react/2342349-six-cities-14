import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AuthData} from '../types/auth-data.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {AppDispatch, State} from '../types/state.ts';
import {UserData} from '../types/user-data.ts';
import {setLoadingScreenShow, setOffers, setError, setAuthorizationStatus} from './action.ts';


export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
}>(
  'data/clearError',
  async (_, { dispatch }) => new Promise((resolve) => {
    setTimeout(() => {
      dispatch(setError(null));
      resolve();
    }, TIMEOUT_SHOW_ERROR);
  }),
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingScreenShow(true));
    const {data} = await api.get<BriefOffer[]>(APIRoute.GetOffers);
    dispatch(setOffers(data));
    dispatch(setLoadingScreenShow(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    // dispatch(setLoadingScreenShow(true));
    try {
      await api.get(APIRoute.GetLogin);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
    // dispatch(setLoadingScreenShow(false));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.PostLogin, {email, password});
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.DeleteLogout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);
