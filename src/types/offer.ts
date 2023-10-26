import {City} from './city.ts';
import {Host} from './host.ts';
import {Location} from './location.ts';

export interface Offer {
  id: number;
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  previewImage: string;
  description: string;
  images: string[];
  goods: string[];
  city: City;
  host: Host;
  location: Location;
}

