import {createAction} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {AuthorizationStatusType} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {Review} from '../types/review.ts';

export const setOffers = createAction<BriefOffer[]>('data/setOffers');
export const setReviews = createAction<Review[]>('data/setReviews');
export const setLoadingScreenShow = createAction<boolean>('data/setLoadingScreenShow');

export const setCities = createAction<City[]>('site/setCities');
export const selectCity = createAction<City>('site/selectCity');
export const setSortType = createAction<keyof typeof sortOptions>('site/setSortType');
export const setError = createAction<string | null>('site/setError');
export const setAuthorizationStatus = createAction<AuthorizationStatusType>('site/setAuthorizationStatus');
