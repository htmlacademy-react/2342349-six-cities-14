import {Offer} from '../../types/offer.ts';
import Card from '../card/card.tsx';

interface NearbyOfferListProps {
    offers: Offer[];
}
function NearbyOfferList({offers}: NearbyOfferListProps) {
  const offerCards = offers
    .slice(0, 3)
    .map((offer) => (
      <Card
        key={offer.id}
        cardType={'cities'}
        offer={offer}
      />
    ));

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offerCards}
        </div>
      </section>
    </div>
  );
}

export default NearbyOfferList;
