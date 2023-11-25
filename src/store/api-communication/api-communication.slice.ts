import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {NameSpace} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {FullOffer} from '../../types/full-offer.ts';
import {Review} from '../../types/review.ts';

import {
  fetchCurrentNearbyOffersAction,
  fetchCurrentOfferAction,
  fetchCurrentReviewsAction, fetchFavoritesAction,
  fetchOffersAction,
  postReviewAction, updateFavoriteAction
} from '../api-actions/data-api-actions.ts';

interface ApiCommunicationState {
    offers: BriefOffer[];
    currentOffer: FullOffer | null;
    currentNearbyOffers: BriefOffer[] | null;
    currentReviews: Review[] | null;
    favorites: BriefOffer[];
    isLoading: boolean;
    isReviewSubmitted: boolean;
}

const initialState: ApiCommunicationState = {
  offers: [],
  currentOffer: null,
  currentNearbyOffers: null,
  currentReviews: null,
  favorites: [],
  isLoading: false,
  isReviewSubmitted: false,
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to to fetch offers.');
        }
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to fetch current offer.');
        }
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentNearbyOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentNearbyOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to fetch nearby offers.');
        }
      })
      .addCase(fetchCurrentNearbyOffersAction.fulfilled, (state, action) => {
        state.currentNearbyOffers = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentReviewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentReviewsAction.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to update reviews');
        }
      })
      .addCase(fetchCurrentReviewsAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
        state.isLoading = false;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postReviewAction.rejected, (state, action) => {
        state.isReviewSubmitted = false;
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to post review.');
        }
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewSubmitted = true;
        state.isLoading = false;
        toast.success('Your review has been posted successfully.');
      })

      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to fetch favorites offers.');
        }
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })

      .addCase(updateFavoriteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavoriteAction.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during to update favorite offer.');
        }
      })
      .addCase(updateFavoriteAction.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Update favorite offer successfully.');
      });
  }
});

export const {
  clearCurrentOffer,
  clearCurrentReviews,
  clearCurrentNearbyOffers,
  setReviewSubmitted
} = apiCommunicationSlice.actions;
