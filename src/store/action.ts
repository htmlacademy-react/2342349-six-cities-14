import {createAction} from '@reduxjs/toolkit';
import {sortOptions} from '../components/sort-list/sort-offers.ts';
import {AuthorizationStatusType} from '../const.ts';
import {BriefOffer} from '../types/brief-offer.ts';
import {City} from '../types/city.ts';
import {FullOffer} from '../types/full-offer.ts';
import {Review} from '../types/review.ts';

export const setOffers = createAction<BriefOffer[]>('data/setOffers');
export const setCurrentOffer = createAction<FullOffer>('data/setCurrentOffer');
export const clearCurrentOffer = createAction('data/clearCurrentOffer');
export const setCurrentNearbyOffers = createAction<BriefOffer[]>('data/setCurrentNearbyOffers');
export const clearCurrentNearbyOffers = createAction('data/clearCurrentNearbyOffers');
export const setCurrentReviews = createAction<Review[]>('data/setCurrentReviews');
export const clearCurrentReviews = createAction('data/clearCurrentReviews');
export const setLoadingInProgress = createAction<boolean>('data/loadingInProgress');

export const setCities = createAction<City[]>('site/setCities');
export const selectCity = createAction<City>('site/selectCity');
export const setSortType = createAction<keyof typeof sortOptions>('site/setSortType');
export const setAuthorizationStatus = createAction<AuthorizationStatusType>('site/setAuthorizationStatus');

