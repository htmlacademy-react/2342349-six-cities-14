import {City} from '../../../types/city.ts';
import {MapPoint} from '../../../types/mapPoint.ts';
import {Offer} from '../../../types/offer.ts';

function createMapPoint(offer: Offer): MapPoint {
  return {
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    zoom: offer.location.zoom
  };
}

function getMapDataFromOffers(
  offers: Offer[],
  selectedCity: City,
  selectedOfferId: Offer['id']): [MapPoint, MapPoint[], MapPoint | undefined] {

  const mapPoints: MapPoint[] = offers.map(createMapPoint);

  const mapCity: MapPoint = {
    title: selectedCity.name,
    lat: selectedCity.location.latitude,
    lng: selectedCity.location.longitude,
    zoom: selectedCity.location.zoom
  };

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
  const selectedMapPoint: MapPoint | undefined = selectedOffer ? createMapPoint(selectedOffer) : undefined;

  return [mapCity, mapPoints, selectedMapPoint];
}

export default getMapDataFromOffers;
