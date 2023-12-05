import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getOffers = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].offers;
export const getFavorites = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].favorites;
export const getFavoritesCount = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].favoritesCount;
export const getCurrentOffer = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentOffer;
export const getCurrentNearbyOffers = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentNearbyOffers;
export const getCurrentReviews = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentReviews;
export const getCurrentReviewsCount = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentReviewsCount;
export const getIsLoading = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].isLoading;
export const getIsReviewSubmitted = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].isReviewSubmitted;
export const getCurrentOfferStatus = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentOfferStatus;
export const getIsCurrentOfferFavorite = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].isCurrentOfferFavorite;
