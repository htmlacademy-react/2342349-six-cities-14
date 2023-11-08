export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer',
    OfferId = '/offer/:id',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 2500;

export const MAX_RENT_OFFERS = 5;

export const MAX_NEAR_OFFERS = 3;

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const REVIEW_RATING = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export const CITY_BY_DEFAULT = 'Paris';

export const CITY_FOR_EMPTY_LIST =
    [
      {
        'name': 'Dusseldorf',
        'location': {
          'latitude': 51.225402,
          'longitude': 6.776314,
          'zoom': 13
        }
      },
      {
        'name': 'Amsterdam',
        'location': {
          'latitude': 52.37454,
          'longitude': 4.897976,
          'zoom': 13
        }
      },
      {
        'name': 'Brussels',
        'location': {
          'latitude': 50.846557,
          'longitude': 4.351697,
          'zoom': 13
        }
      },
      {
        'name': 'Hamburg',
        'location': {
          'latitude': 53.550341,
          'longitude': 10.000654,
          'zoom': 13
        }
      },
      {
        'name': 'Cologne',
        'location': {
          'latitude': 50.938361,
          'longitude': 6.959974,
          'zoom': 13
        }
      },
      {
        'name': 'Paris',
        'location': {
          'latitude': 48.85661,
          'longitude': 2.351499,
          'zoom': 13
        }
      }
    ];
