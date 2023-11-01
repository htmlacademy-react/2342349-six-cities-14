import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate, useParams} from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list.tsx';
import SingleOffer from '../../components/single-offer/single-offer.tsx';
import {AppRoute} from '../../const.ts';
import getMapDataFromOffers from '../../helpers/mapDataHelpers.ts';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';

interface OfferPageProps {
  offers: Offer[];
  reviews: Review[];
  nearbyOffers: Offer[];
}

function OfferPage({offers, reviews, nearbyOffers}: Readonly<OfferPageProps>) {
  const [selectedOfferId, setSelectedOfferId] = useState<Offer['id']>(0);

  const { id: idString} = useParams<{ id: string }>();
  if (!idString) {
    return <Navigate to={AppRoute.Main}/>;
  }
  const id = parseInt(idString, 10);
  const offer = offers.find((offerItem) => offerItem.id === id);
  if (!offer) {
    return <Navigate to={AppRoute.Main}/>;
  }

  const [mapCity, mapPoints, selectedMapPoint] =
        getMapDataFromOffers(nearbyOffers.slice(0, 3), selectedOfferId);

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
          reviews={reviews}
          city={mapCity}
          points={mapPoints}
          selectedPoint={selectedMapPoint}
        />
        <NearbyOfferList
          offers={nearbyOffers}
          onCardInteraction={setSelectedOfferId}
        />
      </main>
    </div>
  );
}

export default OfferPage;
