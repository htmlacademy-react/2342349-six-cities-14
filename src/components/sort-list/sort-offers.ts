import {Offer} from '../../types/offer.ts';

const sortOptions = {
  POPULAR: {
    title: 'Popular',
    sortFn: (offers: Offer[]) => offers
  },
  LOW_TO_HIGH: {
    title: 'Price: low to high',
    sortFn: (offers: Offer[]) => offers.toSorted((a, b) => a.price - b.price)
  },
  HIGH_TO_LOW: {
    title: 'Price: high to low',
    sortFn: (offers: Offer[]) => offers.toSorted((a, b) => b.price - a.price)
  },
  TOP_RATED_FIRST: {
    title: 'Top rated first',
    sortFn: (offers: Offer[]) => offers.toSorted((a, b) => b.rating - a.rating)
  },
} as const;

function sortOffers(offers: Offer[], sortType: keyof typeof sortOptions): Offer[] {
  return sortOptions[sortType].sortFn(offers);
}

export {sortOptions, sortOffers};

