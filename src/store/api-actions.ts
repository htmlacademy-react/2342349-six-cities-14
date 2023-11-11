import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {AppDispatch, State} from '../types/state.ts';
import {setOffersLoadingStatus, setOffers, setError} from './action.ts';


const clearErrorAction = createAsyncThunk<void, undefined, {
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

const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(false));
    const {data} = await api.get<BriefOffer[]>(APIRoute.GetOffers);
    dispatch(setOffers(data));
    dispatch(setOffersLoadingStatus(true));
  },
);

export {fetchOffersAction, clearErrorAction};
