import {createReducer} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {AuthorizationStatus, AuthorizationStatusType, CITY_FOR_EMPTY_LIST} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {FullOffer} from '../types/full-offer.ts';
import {Review} from '../types/review.ts';
import {
  clearNearbyOffers,
  clearOffer,
  selectCity,
  setAuthorizationStatus,
  setCities,
  setLoadingInProgress,
  setNearbyOffers,
  setOffer,
  setOffers,
  setReviews,
  setSortType
} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: BriefOffer[];
    offer: FullOffer | null;
    nearbyOffers: BriefOffer[] | null;
    reviews: Review[] | null;
    currentSortType: keyof typeof sortOptions;
    loadingInProgress: boolean;
    authorizationStatus: AuthorizationStatusType;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: [],
  offer: null,
  nearbyOffers: null,
  reviews: null,
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
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.offer = null;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearbyOffers = null;
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
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {dataReducer};
