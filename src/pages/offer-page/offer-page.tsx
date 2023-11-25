import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import LeafletMap from '../../components/leaflet-map/leaflet-map.tsx';
import getMapDataFromOffers from '../../components/leaflet-map/map-utils/map-data.ts';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list.tsx';
import OfferDetails from '../../components/offer-details/offer-details.tsx';
import ReviewForm from '../../components/review-form/review-form.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import {
  MAX_COMMENT_LENGTH,
  MAX_IMAGES_PER_OFFER,
  MAX_NEAR_OFFERS,
  MAX_REVIEWS_PER_OFFER,
  MIN_COMMENT_LENGTH
} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOfferDetails} from '../../store/api-actions/data-api-actions.ts';
import {
  getCurrentNearbyOffers,
  getCurrentOffer,
  getCurrentReviews,
  getOffers
} from '../../store/api-communication/api-communication.selectors.ts';
import {getSelectedCity} from '../../store/ui-settings/ui-settings.selectors.ts';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import NotFoundPage from '../not-found-page/not-found-page.tsx';

function OfferPage() {
  const [selectedOfferId, setSelectedOfferId] = useState<BriefOffer['id']>('');
  const {id: urlId} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const isOfferExist = offers.some((offerItem) => offerItem.id === urlId);
  const currentOffer = useAppSelector(getCurrentOffer);
  const currentNearbyOffers = useAppSelector(getCurrentNearbyOffers);
  const currentReviews = useAppSelector(getCurrentReviews);
  const selectedCity = useAppSelector(getSelectedCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (urlId && isOfferExist) {
      dispatch(fetchOfferDetails(urlId));
    }
  }, [dispatch, urlId, isOfferExist]);

  if (offers.length > 0 && !isOfferExist || !urlId) {
    return <NotFoundPage text={`Offer with id '${urlId}' not found.`}/>;
  }

  if (!currentOffer && !currentNearbyOffers && !currentReviews) {
    return null;
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

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Offers</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--offer">
        {currentOffer && (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {imageList}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <OfferDetails
                  offer={currentOffer}
                  authorizationStatus={authorizationStatus}
                />

                <section className="offer__reviews reviews">
                  {currentReviews && (
                    <ReviewList reviews={currentReviews.slice(0, MAX_REVIEWS_PER_OFFER)}/>
                  )}
                  <ReviewForm
                    offerId={urlId}
                    authorizationStatus={authorizationStatus}
                    minCommentLength={MIN_COMMENT_LENGTH}
                    maxCommentLength={MAX_COMMENT_LENGTH}
                  />
                </section>
              </div>
            </div>

            {mapCity && mapPoints && (
              <LeafletMap block={'offer'} city={mapCity} points={mapPoints} selectedPoint={selectedMapPoint}/>
            )}
          </section>
        )}

        {currentOffer && currentNearbyOffers && (
          <NearbyOfferList
            offers={currentNearbyOffers}
            selectedOffer={currentOffer}
            onCardInteraction={setSelectedOfferId}
            authorizationStatus={authorizationStatus}
          />
        )}
      </main>
    </div>
  );
}

export default OfferPage;
