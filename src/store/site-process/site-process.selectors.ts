import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getOffers = (state: State) => state[NameSpace.Site].offers;
export const getCurrentOffer = (state: State) => state[NameSpace.Site].currentOffer;
export const getCurrentNearbyOffers = (state: State) => state[NameSpace.Site].currentNearbyOffers;
export const getCurrentReviews = (state: State) => state[NameSpace.Site].currentReviews;
export const getLoadingInProgress = (state: State) => state[NameSpace.Site].loadingInProgress;
