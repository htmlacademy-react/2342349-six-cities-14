import {Offer} from '../../types/offer.ts';

enum SortOfferTypes {
    POPULAR = 'Popular',
    LOW_TO_HIGH = 'Price: low to high',
    HIGH_TO_LOW = 'Price: high to low',
    TOP_RATED_FIRST = 'Top rated first',
}

function sortOffers(offers: Offer[], sortType: SortOfferTypes): Offer[] {
  const sortedOffers = structuredClone(offers);

  switch (sortType) {
    case SortOfferTypes.LOW_TO_HIGH:
      return sortedOffers.sort((a, b) => a.price - b.price);
    case SortOfferTypes.HIGH_TO_LOW:
      return sortedOffers.sort((a, b) => b.price - a.price);
    case SortOfferTypes.TOP_RATED_FIRST:
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sortedOffers;
  }
}

export {SortOfferTypes, sortOffers};

