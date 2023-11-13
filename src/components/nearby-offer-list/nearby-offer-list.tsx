import {BriefOffer} from '../../types/brief-offer.ts';
import Card from '../card/card.tsx';

interface NearbyOfferListProps {
  offers: BriefOffer[];
  selectedOffer: BriefOffer;
  onCardInteraction?: (cardId: BriefOffer['id']) => void;
}

function NearbyOfferList({offers, selectedOffer, onCardInteraction}: Readonly<NearbyOfferListProps>) {
  const offerCards = offers
    .slice(0, 3)
    .map((offer) => (
      <Card
        key={offer.id}
        cardType={'cities'}
        offer={offer}
        onCardInteraction={onCardInteraction}
      />
    ));
  const cardInteractionHandler = onCardInteraction ? () => onCardInteraction(selectedOffer.id) : undefined;

  return (
    <div className="container">
      <section
        className="near-places places"
        onMouseLeave={cardInteractionHandler}
      >
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offerCards}
        </div>
      </section>
    </div>
  );
}

export default NearbyOfferList;
