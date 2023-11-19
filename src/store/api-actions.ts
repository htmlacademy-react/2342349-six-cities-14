import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AuthorizationStatus} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AuthData} from '../types/auth-data.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {FullOffer} from '../types/full-offer.ts';
import {ReviewData} from '../types/review-data.ts';
import {Review} from '../types/review.ts';
import {AppDispatch, State} from '../types/state.ts';
import {UserData} from '../types/user-data.ts';
import {
  setAuthorizationStatus,
  setLoadingInProgress,
  setNearbyOffers,
  setOffer,
  setOffers,
  setReviews
} from './action.ts';

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

export const fetchOfferAction = createAsyncThunk<
  void,
  BriefOffer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffer',
    async (id, {dispatch, extra: api}) => {
      const url = APIRoute.GetOffer.replace(':offerId', id.toString());
      const {data} = await api.get<FullOffer>(url);
      dispatch(setOffer(data));
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  BriefOffer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchNearbyOffersAction',
    async (id, {dispatch, extra: api}) => {
      const url = APIRoute.GetOfferNearby.replace(':offerId', id.toString());
      const {data} = await api.get<BriefOffer[]>(url);
      dispatch(setNearbyOffers(data));
    },
  );

export const fetchReviewsAction = createAsyncThunk<
  void,
  BriefOffer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchReviewsAction',
    async (id, {dispatch, extra: api}) => {
      const url = APIRoute.GetComments.replace(':offerId', id.toString());
      const {data} = await api.get<Review[]>(url);
      dispatch(setReviews(data));
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
      return {success: true, token};
    } catch {
      return {success: false};
    } finally {
      dispatch(setLoadingInProgress(false));
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

export const postReview = createAsyncThunk<
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
  'user/postReview',
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
