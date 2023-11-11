import {createReducer} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {CITY_FOR_EMPTY_LIST} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {Review} from '../types/review.ts';
import {
  selectCity,
  setOffersLoadingStatus,
  setCities,
  setOffers,
  setReviews,
  setSortType, setError
} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: BriefOffer[];
    reviews: Review[];
    currentSortType: keyof typeof sortOptions;
    isOffersDataLoaded: boolean;
    error: string | null;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: [],
  reviews: [],
  currentSortType: 'POPULAR',
  isOffersDataLoaded: false,
  error: null,
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
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {dataReducer};
