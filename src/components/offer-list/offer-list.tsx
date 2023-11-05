import {useState} from 'react';
import {City} from '../../types/city.ts';
import {Offer} from '../../types/offer.ts';
import Card from '../card/card.tsx';
import LeafletMap from '../leaflet-map/leaflet-map.tsx';
import getMapDataFromOffers from '../leaflet-map/map-utils/map-data.ts';

interface OfferListProps {
  offers: Offer[];
  selectedCity: City;
  maxOfferLimit: number;
}

function OfferList({offers, selectedCity, maxOfferLimit}: Readonly<OfferListProps>) {
  const [selectedOfferId, setSelectedOfferId] = useState<Offer['id']>(0);

  const currentOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
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
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
                  Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
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
