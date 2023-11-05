import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {Review} from '../types/review.ts';

export const selectCity = createAction<City>('selectCity');
export const updateOffers = createAction<Offer[]>('updateOffers');
export const updateCities = createAction<City[]>('updateCities');
export const updateReviews = createAction<Review[]>('updateReviews');
