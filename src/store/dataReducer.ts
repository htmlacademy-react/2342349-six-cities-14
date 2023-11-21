import {createReducer} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {AuthorizationStatus, AuthorizationStatusType, CITY_FOR_EMPTY_LIST} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {FullOffer} from '../types/full-offer.ts';
import {Review} from '../types/review.ts';
import {
  clearCurrentNearbyOffers,
  clearCurrentOffer,
  selectCity,
  setAuthorizationStatus,
  setCities,
  setLoadingInProgress,
  setCurrentNearbyOffers,
  setCurrentOffer,
  setOffers,
  setCurrentReviews,
  setSortType
} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: BriefOffer[];
    currentOffer: FullOffer | null;
    currentNearbyOffers: BriefOffer[] | null;
    currentReviews: Review[] | null;
    currentSortType: keyof typeof sortOptions;
    loadingInProgress: boolean;
    authorizationStatus: AuthorizationStatusType;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: [],
  currentOffer: null,
  currentNearbyOffers: null,
  currentReviews: null,
  currentSortType: 'POPULAR',
  loadingInProgress: false,
  authorizationStatus: AuthorizationStatus.Unknown
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(setCities, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(clearCurrentOffer, (state) => {
      state.currentOffer = null;
    })
    .addCase(setCurrentNearbyOffers, (state, action) => {
      state.currentNearbyOffers = action.payload;
    })
    .addCase(clearCurrentNearbyOffers, (state) => {
      state.currentNearbyOffers = null;
    })
    .addCase(setCurrentReviews, (state, action) => {
      state.currentReviews = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.currentSortType = action.payload;
    })
    .addCase(setLoadingInProgress, (state, action) => {
      state.loadingInProgress = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {dataReducer};
