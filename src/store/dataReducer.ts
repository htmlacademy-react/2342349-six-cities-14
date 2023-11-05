import {createReducer} from '@reduxjs/toolkit';
import {CITY_FOR_EMPTY_LIST} from '../const.ts';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {Review} from '../types/review.ts';
import {updateCities, selectCity, updateOffers, updateReviews} from './action.ts';

interface State {
    selectedCity: City;
    cities: City[];
    offers: Offer[] | undefined;
    reviews: Review[] | undefined;
}

const initialState: State = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  offers: undefined,
  reviews: undefined,
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
    });
});

export {dataReducer};
