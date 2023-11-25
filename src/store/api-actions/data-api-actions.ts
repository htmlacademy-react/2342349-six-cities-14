import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const.ts';
import {handleApiError} from '../../services/api-error-handler.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {FullOffer} from '../../types/full-offer.ts';
import {ReviewData} from '../../types/review-data.ts';
import {Review} from '../../types/review.ts';
import {UserData} from '../../types/user-data.ts';
import {
  clearCurrentNearbyOffers,
  clearCurrentOffer,
  clearCurrentReviews,
} from '../api-communication/api-communication.slice.ts';
import {ThunkApiConfig} from '../state.ts';

export const fetchOffersAction = createAsyncThunk<
  BriefOffer[],
  undefined,
  ThunkApiConfig
>(
  'data/fetchOffersAction',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<BriefOffer[]>(APIRoute.GetOffers);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<
  FullOffer,
  BriefOffer['id'],
  ThunkApiConfig
>(
  'data/fetchCurrentOfferAction',
  async (id, {extra: api, rejectWithValue}) => {
    try {
      const url = APIRoute.GetOffer.replace(':offerId', id.toString());
      const {data} = await api.get<FullOffer>(url);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchCurrentNearbyOffersAction = createAsyncThunk<
  BriefOffer[],
  BriefOffer['id'],
  ThunkApiConfig
>(
  'data/fetchCurrentNearbyOffersAction',
  async (id, {extra: api,rejectWithValue}) => {
    try {
      const url = APIRoute.GetOfferNearby.replace(':offerId', id.toString());
      const {data} = await api.get<BriefOffer[]>(url);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchCurrentReviewsAction = createAsyncThunk<
  Review[],
  BriefOffer['id'],
  ThunkApiConfig
>(
  'data/fetchCurrentReviewsAction',
  async (id, {extra: api, rejectWithValue}) => {
    try {
      const url = APIRoute.GetComments.replace(':offerId', id.toString());
      const {data} = await api.get<Review[]>(url);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchOfferDetails = createAsyncThunk<
  void,
  BriefOffer['id'],
  ThunkApiConfig
>(
  'data/fetchOfferDetailsAction',
  (id, {dispatch}) => {
    dispatch(clearCurrentOffer());
    dispatch(clearCurrentNearbyOffers());
    dispatch(clearCurrentReviews());
    dispatch(fetchCurrentOfferAction(id));
    dispatch(fetchCurrentNearbyOffersAction(id));
    dispatch(fetchCurrentReviewsAction(id));
  },
);

export const postReviewAction = createAsyncThunk<
  void,
  {
    reviewData: ReviewData;
    id: BriefOffer['id'];
  },
  ThunkApiConfig
>(
  'data/postReviewAction',
  async ({id, reviewData}, {extra: api , rejectWithValue}) => {
    try {
      const url = APIRoute.PostComment.replace(':offerId', id.toString());
      await api.post<UserData>(url, reviewData);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const submitReviewAndUpdate = createAsyncThunk<
  void,
  {
    reviewData: ReviewData;
    id: BriefOffer['id'];
  },
  ThunkApiConfig
>(
  'data/submitReviewAndUpdateAction',
  async ({id, reviewData}, {dispatch}) => {
    await dispatch(postReviewAction({reviewData, id}));
    await dispatch(fetchCurrentReviewsAction(id));
  },
);

export const fetchFavoritesAction = createAsyncThunk<
  BriefOffer[],
  undefined,
  ThunkApiConfig
>(
  'data/fetchFavoritesAction',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<BriefOffer[]>(APIRoute.GetFavorite);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateFavoriteAction = createAsyncThunk<
  void,
  {
    status: number;
    id: BriefOffer['id'];
  },
  ThunkApiConfig
>(
  'data/updateFavoriteAction',
  async ({id, status}, {extra: api, dispatch, rejectWithValue}) => {
    try {
      const url = APIRoute.PostFavorite.replace(':offerId', id.toString()).replace(':statusId', status.toString());
      await api.post(url);
      await dispatch(fetchFavoritesAction());
      await dispatch(fetchOffersAction());
      await dispatch(fetchCurrentOfferAction(id));
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
