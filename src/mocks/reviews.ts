import {Review} from '../types/review.ts';

export const reviews: Review[] = [
  {
    'id': 1,
    'user': {
      'id': 15,
      'isPro': false,
      'name': 'Kendall',
      'avatarUrl': 'https://14.react.pages.academy/static/avatar/6.jpg'
    },
    'rating': 4,
    'comment': 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    'date': new Date('2023-10-02T09:23:20.316Z')
  }
];
