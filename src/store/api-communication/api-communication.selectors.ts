import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getOffers = (state: State) => state[NameSpace.ApiCommunication].offers;
export const getFavorites = (state: State) => state[NameSpace.ApiCommunication].favorites;
export const getCurrentOffer = (state: State) => state[NameSpace.ApiCommunication].currentOffer;
export const getCurrentNearbyOffers = (state: State) => state[NameSpace.ApiCommunication].currentNearbyOffers;
export const getCurrentReviews = (state: State) => state[NameSpace.ApiCommunication].currentReviews;
export const getIsLoading = (state: State) => state[NameSpace.ApiCommunication].isLoading;
export const getIsReviewSubmitted = (state: State) => state[NameSpace.ApiCommunication].isReviewSubmitted;
