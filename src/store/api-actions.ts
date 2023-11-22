import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AuthData} from '../types/auth-data.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {FullOffer} from '../types/full-offer.ts';
import {ReviewData} from '../types/review-data.ts';
import {Review} from '../types/review.ts';
import {AppDispatch, State} from '../types/state.ts';
import {UserData} from '../types/user-data.ts';
import {setLoadingInProgress} from './action.ts';

export const fetchOffersAction = createAsyncThunk <
    BriefOffer[], undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<BriefOffer[]>(APIRoute.GetOffers);
      return data;
    }
  );

export const fetchCurrentOfferAction = createAsyncThunk<
    FullOffer, BriefOffer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCurrentOfferAction',
    async (id, {extra: api}) => {
      const url = APIRoute.GetOffer.replace(':offerId', id.toString());
      const {data} = await api.get<FullOffer>(url);
      return data;
    },
  );

export const fetchCurrentNearbyOffersAction = createAsyncThunk<
    BriefOffer[], BriefOffer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCurrentNearbyOffersAction',
    async (id, {extra: api}) => {
      const url = APIRoute.GetOfferNearby.replace(':offerId', id.toString());
      const {data } = await api.get<BriefOffer[]>(url);
      return data;
    },
  );

export const fetchCurrentReviewsAction = createAsyncThunk<
  Review[], BriefOffer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCurrentReviewsAction',
    async (id, {extra: api}) => {
      const url = APIRoute.GetComments.replace(':offerId', id.toString());
      const {data} = await api.get<Review[]>(url);
      return data;
    },
  );

export const postReviewAction = createAsyncThunk<
    { success: boolean },
    {
        reviewData: ReviewData;
        id: BriefOffer['id'];
    }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}
>(
  'data/postReviewAction',
  async ({id, reviewData}, {dispatch, extra: api}) => {
    const {comment, rating} = reviewData;
    dispatch(setLoadingInProgress(true));
    try {
      const url = APIRoute.PostComment.replace(':offerId', id.toString());
      await api.post<UserData>(url, {comment, rating});
      return {success: true};
    } catch {
      return {success: false};
    } finally {
      dispatch(setLoadingInProgress(false));
    }
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
    } finally {
      dispatch(setLoadingInProgress(false));
    }
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
    let result;
    try {
      const response = await api.post<UserData>(APIRoute.PostLogin, {email, password});
      const token = response.data?.token ?? '';
      saveToken(token);
      result = {success: true, token};
    } catch {
      result = {success: false};
    } finally {
      dispatch(setLoadingInProgress(false));
    }
    return result;
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
    try {
      await api.delete(APIRoute.DeleteLogout);
      dropToken();
    } finally {
      dispatch(setLoadingInProgress(false));
    }
  },
);
