import {createReducer} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {AuthorizationStatus, AuthorizationStatusType, CITY_FOR_EMPTY_LIST} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {Review} from '../types/review.ts';
import {
  selectCity,
  setLoadingScreenShow,
  setCities,
  setOffers,
  setReviews,
  setSortType, setError, setAuthorizationStatus
} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: BriefOffer[];
    reviews: Review[];
    currentSortType: keyof typeof sortOptions;
    isLoadingScreenShow: boolean;
    error: string | null;
    authorizationStatus: AuthorizationStatusType;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: [],
  reviews: [],
  currentSortType: 'POPULAR',
  isLoadingScreenShow: false,
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
    .addCase(setLoadingScreenShow, (state, action) => {
      state.isLoadingScreenShow = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {dataReducer};
