import {createReducer} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {AuthorizationStatus, AuthorizationStatusType, CITY_FOR_EMPTY_LIST} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {Review} from '../types/review.ts';
import {
  selectCity,
  setLoadingInProgress,
  setCities,
  setOffers,
  setReviews,
  setSortType, setError, setAuthorizationStatus, clearErrorAction
} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: BriefOffer[];
    reviews: Review[];
    currentSortType: keyof typeof sortOptions;
    loadingInProgress: boolean;
    error: string | null;
    authorizationStatus: AuthorizationStatusType;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: [],
  reviews: [],
  currentSortType: 'POPULAR',
  loadingInProgress: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCities, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.currentSortType = action.payload;
    })
    .addCase(setLoadingInProgress, (state, action) => {
      state.loadingInProgress = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(clearErrorAction, (state) => {
      state.error = null;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {dataReducer};
