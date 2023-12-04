import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {FullOffer} from '../../types/full-offer.ts';
import {OfferStatus, OfferStatusType} from '../../types/offer-status.ts';
import {Review} from '../../types/review.ts';
import {
  fetchCurrentNearbyOffersAction,
  fetchCurrentOfferAction,
  fetchCurrentReviewsAction,
  fetchFavoritesAction,
  fetchOffersAction,
  postReviewAction,
  updateFavoriteAction
} from '../api-actions/data-api-actions.ts';

interface ApiCommunicationState {
    offers: BriefOffer[];
    currentOffer: FullOffer | null;
    currentNearbyOffers: BriefOffer[] | null;
    currentReviews: Review[] | null;
    currentReviewsCount: number;
    favorites: BriefOffer[];
    favoritesCount: number;
    isLoading: boolean;
    isReviewSubmitted: boolean;
    currentOfferStatus: OfferStatusType;
    isCurrentOfferFavorite: boolean;
}

const initialState: ApiCommunicationState = {
  offers: [],
  currentOffer: null,
  currentNearbyOffers: null,
  currentReviews: null,
  currentReviewsCount: 0,
  favorites: [],
  favoritesCount: 0,
  isLoading: false,
  isReviewSubmitted: false,
  currentOfferStatus: OfferStatus.LOADING,
  isCurrentOfferFavorite: false
};

export const apiCommunicationSlice = createSlice({
  name: NameSpace.ApiCommunication,
  initialState,
  reducers: {
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
    },
    clearCurrentNearbyOffers: (state) => {
      state.currentNearbyOffers = null;
    },
    clearCurrentReviews: (state) => {
      state.currentReviews = null;
    },
    setReviewSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isReviewSubmitted = action.payload;
    },
    setFavoritesCount: (state, action: PayloadAction<number>) => {
      state.favoritesCount = action.payload;
    },
    decreaseFavoritesCount: (state) => {
      state.favoritesCount--;
    },
    increaseFavoritesCount: (state) => {
      state.favoritesCount++;
    },
    increaseCurrentReviewsCount: (state) => {
      state.currentReviewsCount++;
    },
    setCurrentOfferFavorite: (state, action: PayloadAction<boolean>) => {
      state.isCurrentOfferFavorite = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
        state.currentOfferStatus = OfferStatus.LOADING;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.currentOfferStatus = OfferStatus.NOT_EXISTS;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
        state.currentOfferStatus = OfferStatus.EXISTS;
        state.isCurrentOfferFavorite = state.currentOffer.isFavorite;
      })

      .addCase(fetchCurrentNearbyOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentNearbyOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentNearbyOffersAction.fulfilled, (state, action) => {
        state.currentNearbyOffers = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentReviewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentReviewsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentReviewsAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
        state.currentReviewsCount = state.currentReviews.length;
        state.isLoading = false;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewSubmitted = false;
        state.isLoading = false;
        state.currentReviewsCount--;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewSubmitted = true;
        state.isLoading = false;
      })

      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesCount = state.favorites.length;
        state.isLoading = false;
      })

      .addCase(updateFavoriteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavoriteAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFavoriteAction.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  clearCurrentOffer,
  clearCurrentReviews,
  clearCurrentNearbyOffers,
  setReviewSubmitted,
  increaseFavoritesCount,
  decreaseFavoritesCount,
  increaseCurrentReviewsCount,
  setCurrentOfferFavorite
} = apiCommunicationSlice.actions;
