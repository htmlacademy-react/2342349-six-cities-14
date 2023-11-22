import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {FullOffer} from '../../types/full-offer.ts';
import {Review} from '../../types/review.ts';
import {
  fetchCurrentNearbyOffersAction,
  fetchCurrentOfferAction,
  fetchCurrentReviewsAction,
  fetchOffersAction,
  postReviewAction
} from '../api-actions.ts';

interface SiteProcess {
    offers: BriefOffer[];
    currentOffer: FullOffer | null;
    currentNearbyOffers: BriefOffer[] | null;
    currentReviews: Review[] | null;
    loadingInProgress: boolean;
}

const initialState: SiteProcess = {
  offers: [],
  currentOffer: null,
  currentNearbyOffers: null,
  currentReviews: null,
  loadingInProgress: false,
};

const siteProcess = createSlice({
  name: NameSpace.Site,
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
    setLoadingInProgress: (state, action: PayloadAction<boolean>) => {
      state.loadingInProgress = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.loadingInProgress = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.loadingInProgress = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loadingInProgress = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.loadingInProgress = true;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.loadingInProgress = false;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.loadingInProgress = false;
      })
      .addCase(fetchCurrentNearbyOffersAction.pending, (state) => {
        state.loadingInProgress = true;
      })
      .addCase(fetchCurrentNearbyOffersAction.rejected, (state) => {
        state.loadingInProgress = false;
      })
      .addCase(fetchCurrentNearbyOffersAction.fulfilled, (state, action) => {
        state.currentNearbyOffers = action.payload;
        state.loadingInProgress = false;
      })
      .addCase(fetchCurrentReviewsAction.pending, (state) => {
        state.loadingInProgress = true;
      })
      .addCase(fetchCurrentReviewsAction.rejected, (state) => {
        state.loadingInProgress = false;
      })
      .addCase(fetchCurrentReviewsAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
        state.loadingInProgress = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.loadingInProgress = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.loadingInProgress = false;
      })
    //todo
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
        state.loadingInProgress = false;
      });
  }
});

export default siteProcess;
