import {createReducer} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {CITY_FOR_EMPTY_LIST} from '../const.ts';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {Review} from '../types/review.ts';
import {selectCity, updateCities, updateOffers, updateReviews, updateSortType} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: Offer[] | undefined;
    reviews: Review[] | undefined;
    currentSortType: keyof typeof sortOptions;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: undefined,
  reviews: undefined,
  currentSortType: 'POPULAR',
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(updateCities, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(updateReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(updateSortType, (state, action) => {
      state.currentSortType = action.payload;
    });
});

export {dataReducer};
