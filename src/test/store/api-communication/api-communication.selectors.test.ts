import {NameSpace} from '../../../const.ts';
import {
  getCurrentNearbyOffers,
  getCurrentOffer,
  getCurrentOfferStatus,
  getCurrentReviews,
  getCurrentReviewsCount,
  getFavorites,
  getFavoritesCount,
  getIsCurrentOfferFavorite,
  getIsLoading,
  getIsReviewSubmitted,
  getOffers
} from '../../../store/api-communication/api-communication.selectors.ts';
import {OfferStatus} from '../../../types/offer-status.ts';
import {makeFakeBriefOffer, makeFakeFullOffer, makeFakeReview} from '../../utils/mocks.ts';

describe('UserPreferences selector', () => {
  const state = {
    [NameSpace.ApiCommunication]: {
      offers: Array.from({ length: 30 }, () => makeFakeBriefOffer()),
      currentOffer: makeFakeFullOffer(),
      currentNearbyOffers: Array.from({ length: 6 }, () => makeFakeBriefOffer()),
      currentReviews: Array.from({ length: 15 }, () => makeFakeReview()),
      currentReviewsCount: 15,
      favorites: Array.from({ length: 5 }, () => makeFakeBriefOffer()),
      favoritesCount: 5,
      isLoading: false,
      isReviewSubmitted: false,
      currentOfferStatus: OfferStatus.LOADING,
      isCurrentOfferFavorite: false
    }
  };

  it('should return offers from state', () => {
    const {offers} = state[NameSpace.ApiCommunication];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return favorites from state', () => {
    const {favorites} = state[NameSpace.ApiCommunication];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('should return favorites count from state', () => {
    const {favoritesCount} = state[NameSpace.ApiCommunication];
    const result = getFavoritesCount(state);
    expect(result).toEqual(favoritesCount);
  });

  it('should return current offer from state', () => {
    const {currentOffer} = state[NameSpace.ApiCommunication];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const result = getCurrentOffer(state);
    expect(result).toEqual(currentOffer);
  });

  it('should return current nearby offers from state', () => {
    const {currentNearbyOffers} = state[NameSpace.ApiCommunication];
    const result = getCurrentNearbyOffers(state);
    expect(result).toEqual(currentNearbyOffers);
  });

  it('should return current reviews from state', () => {
    const {currentReviews} = state[NameSpace.ApiCommunication];
    const result = getCurrentReviews(state);
    expect(result).toEqual(currentReviews);
  });

  it('should return current reviews count from state', () => {
    const {currentReviewsCount} = state[NameSpace.ApiCommunication];
    const result = getCurrentReviewsCount(state);
    expect(result).toEqual(currentReviewsCount);
  });

  it('should return loading status from state', () => {
    const {isLoading} = state[NameSpace.ApiCommunication];
    const result = getIsLoading(state);
    expect(result).toEqual(isLoading);
  });

  it('should return review submission status from state', () => {
    const {isReviewSubmitted} = state[NameSpace.ApiCommunication];
    const result = getIsReviewSubmitted(state);
    expect(result).toEqual(isReviewSubmitted);
  });

  it('should return current offer status from state', () => {
    const {currentOfferStatus} = state[NameSpace.ApiCommunication];
    const result = getCurrentOfferStatus(state);
    expect(result).toEqual(currentOfferStatus);
  });

  it('should return current offer favorite status from state', () => {
    const {isCurrentOfferFavorite} = state[NameSpace.ApiCommunication];
    const result = getIsCurrentOfferFavorite(state);
    expect(result).toEqual(isCurrentOfferFavorite);
  });
});
