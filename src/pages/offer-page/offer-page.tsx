import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate, useParams} from 'react-router-dom';
import getMapDataFromOffers from '../../components/leaflet-map/map-utils/map-data.ts';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list.tsx';
import SingleOffer from '../../components/single-offer/single-offer.tsx';
import {AppRoute, MAX_COMMENT_LENGTH, MAX_NEAR_OFFERS, MIN_COMMENT_LENGTH} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer.ts';

interface OfferPageProps {
  nearbyOffers: Offer[];
}

function OfferPage({nearbyOffers}: Readonly<OfferPageProps>) {
  const [selectedOfferId, setSelectedOfferId] = useState<Offer['id']>(0);
  const { id: idString} = useParams<{ id: string }>();

  const offers = useAppSelector((state) => state.offers);
  const reviews = useAppSelector((state) => state.reviews);
  const selectedCity = useAppSelector((state) => state.selectedCity);

  if (!offers || !idString) {
    return <Navigate to={AppRoute.Main}/>;
  }
  const id = parseInt(idString, 10);
  const offer = offers.find((offerItem) => offerItem.id === id);
  if (!offer) {
    return <Navigate to={AppRoute.Main}/>;
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
            <Logo />
            <NavigationMenu />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <SingleOffer
          offer={offer}
          reviews={reviews ?? []}
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
