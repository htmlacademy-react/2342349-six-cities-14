import {memo} from 'react';
import {
  MAX_COMMENT_LENGTH,
  MAX_IMAGES_PER_OFFER,
  MAX_NEAR_OFFERS,
  MAX_REVIEWS_PER_OFFER,
  MIN_COMMENT_LENGTH
} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {
  getCurrentNearbyOffers,
  getCurrentOffer,
  getCurrentReviews
} from '../../store/api-communication/api-communication.selectors.ts';
import {getSelectedCity} from '../../store/ui-settings/ui-settings.selectors.ts';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';
import LeafletMap from '../leaflet-map/leaflet-map.tsx';
import getMapDataFromOffers from '../leaflet-map/map-utils/map-data.ts';
import LoadingText from '../loading-text/loading-text.tsx';
import OfferDetails from '../offer-details/offer-details.tsx';
import ReviewForm from '../review-form/review-form.tsx';
import ReviewList from '../review-list/review-list.tsx';

interface OfferBlockProps {
  urlId: string;
  selectedOfferId: string;
}

function OfferBlock({urlId, selectedOfferId}: OfferBlockProps) {
  const currentOffer = useAppSelector(getCurrentOffer);
  const currentNearbyOffers = useAppSelector(getCurrentNearbyOffers);
  const currentReviews = useAppSelector(getCurrentReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const selectedCity = useAppSelector(getSelectedCity);
  const MemoizedOfferDetails = memo(OfferDetails);
  const MemoizedReviewForm = memo(ReviewForm);
  const MemoizedReviewList = memo(ReviewList);

  if (!selectedCity) {
    return;
  }

  const imageList = currentOffer?.images.slice(0, MAX_IMAGES_PER_OFFER).map((image) => (
    <div key={image} className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio"></img>
    </div>
  ));

  let mapCity, mapPoints, selectedMapPoint;
  if (currentOffer && currentNearbyOffers) {
    [mapCity, mapPoints, selectedMapPoint] =
      getMapDataFromOffers([currentOffer, ...currentNearbyOffers.slice(0, MAX_NEAR_OFFERS)], selectedCity, selectedOfferId);
  }

  const mapBlock = (mapCity && mapPoints) ? (
    <LeafletMap block={'offer'} city={mapCity} points={mapPoints} selectedPoint={selectedMapPoint}/>
  ) : <LoadingText/>;

  const reviewBlock = currentReviews ? (
    <MemoizedReviewList reviews={currentReviews.slice(0, MAX_REVIEWS_PER_OFFER)}/>
  ) : <LoadingText/>;

  return currentOffer ? (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {imageList}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          <MemoizedOfferDetails
            offer={currentOffer}
            authorizationStatus={authorizationStatus}
          />

          <section className="offer__reviews reviews">
            {reviewBlock}
            <MemoizedReviewForm
              offerId={urlId}
              authorizationStatus={authorizationStatus}
              minCommentLength={MIN_COMMENT_LENGTH}
              maxCommentLength={MAX_COMMENT_LENGTH}
            />
          </section>
        </div>
      </div>

      {mapBlock}
    </section>
  ) : <LoadingText/>;
}

export default OfferBlock;
