import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import getMapDataFromOffers from '../../components/leaflet-map/map-utils/map-data.ts';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list.tsx';
import SingleOffer from '../../components/single-offer/single-offer.tsx';
import {MAX_COMMENT_LENGTH, MAX_NEAR_OFFERS, MIN_COMMENT_LENGTH} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearNearbyOffers, clearOffer, clearReviews, setLoadingInProgress} from '../../store/action.ts';
import {fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction} from '../../store/api-actions.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import NotFoundPage from '../not-found-page/not-found-page.tsx';

function OfferPage() {
  const [selectedOfferId, setSelectedOfferId] = useState<BriefOffer['id']>('');
  const {id: urlId} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.data.offers);
  const isOfferExist = offers.some((offerItem) => offerItem.id === urlId);
  const offer = useAppSelector((state) => state.data.offer);
  const nearbyOffers = useAppSelector((state) => state.data.nearbyOffers);
  const reviews = useAppSelector((state) => state.data.reviews);
  const selectedCity = useAppSelector((state) => state.data.selectedCity);
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);

  useEffect(() => {
    async function fetchData() {
      if (urlId && isOfferExist) {
        dispatch(setLoadingInProgress(true));
        dispatch(clearOffer());
        dispatch(clearNearbyOffers());
        dispatch(clearReviews());

        await Promise.all([
          dispatch(fetchOfferAction(urlId)),
          dispatch(fetchNearbyOffersAction(urlId)),
          dispatch(fetchReviewsAction(urlId))
        ]);

        dispatch(setLoadingInProgress(false));
      }
    }
    fetchData();
  }, [dispatch, urlId, isOfferExist]);

  if (offers.length > 0 && !isOfferExist) {
    return <NotFoundPage text={`Offer with id '${urlId}' not found.`}/>;
  }

  if (!offer || !urlId || !nearbyOffers || !reviews) {
    return null;
  }

  const [mapCity, mapPoints, selectedMapPoint] =
    getMapDataFromOffers([offer, ...nearbyOffers.slice(0, MAX_NEAR_OFFERS)], selectedCity, selectedOfferId);

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Offers</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <NavigationMenu
              authorizationStatus={authorizationStatus}
            />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <SingleOffer
          authorizationStatus={authorizationStatus}
          offerId={urlId}
          offer={offer}
          reviews={reviews}
          city={mapCity}
          points={mapPoints}
          selectedPoint={selectedMapPoint}
          maxCommentLength={MAX_COMMENT_LENGTH}
          minCommentLength={MIN_COMMENT_LENGTH}
        />
        <NearbyOfferList
          offers={nearbyOffers}
          selectedOffer={offer}
          onCardInteraction={setSelectedOfferId}
        />
      </main>
    </div>
  );
}

export default OfferPage;
