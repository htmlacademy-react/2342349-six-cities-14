import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getCurrentSortType} from '../../store/site-data/site-data.selectors.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {City} from '../../types/city.ts';
import Card from '../card/card.tsx';
import LeafletMap from '../leaflet-map/leaflet-map.tsx';
import getMapDataFromOffers from '../leaflet-map/map-utils/map-data.ts';
import SortList from '../sort-list/sort-list.tsx';
import {sortOffers} from '../sort-list/sort-offers.ts';

interface OfferListProps {
  offers: BriefOffer[];
  selectedCity: City;
  maxOfferLimit: number;
}

function OfferList({offers, selectedCity, maxOfferLimit = 5}: Readonly<OfferListProps>) {
  const [selectedOfferId, setSelectedOfferId] = useState<BriefOffer['id']>('');
  const currentSortType = useAppSelector(getCurrentSortType);

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
  const currentOffers = sortOffers(filteredOffers, currentSortType);
  const offerCards = currentOffers
    .slice(0, maxOfferLimit)
    .map((offer) => (
      <Card
        key={offer.id}
        cardType={'cities'}
        offer={offer}
        onCardInteraction={setSelectedOfferId}
      />
    ));

  const [mapCity, mapPoints, selectedMapPoint] =
    getMapDataFromOffers(currentOffers.slice(0, maxOfferLimit), selectedCity, selectedOfferId);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{currentOffers.length} places to stay in {selectedCity.name}</b>
          <SortList/>

          <div className="cities__places-list places__list tabs__content">
            {offerCards}
          </div>
        </section>
        <div className="cities__right-section">
          <LeafletMap block={'cities'} city={mapCity} points={mapPoints} selectedPoint={selectedMapPoint}/>
        </div>
      </div>
    </div>
  );
}

export default OfferList;
