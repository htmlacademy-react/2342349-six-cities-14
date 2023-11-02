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

function getMapDataFromOffers(offers: Offer[], selectedOfferId: Offer['id']): [MapPoint, MapPoint[], MapPoint | undefined] {

  const mapPoints: MapPoint[] = offers.map(createMapPoint);

  const mapCity: MapPoint = {
    title: offers[0]?.city.name,
    lat: offers[0]?.city.location.latitude,
    lng: offers[0]?.city.location.longitude,
    zoom: offers[0]?.city.location.zoom
  };

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
  const selectedMapPoint: MapPoint | undefined = selectedOffer ? createMapPoint(selectedOffer) : undefined;

  return [mapCity, mapPoints, selectedMapPoint];
}

export default getMapDataFromOffers;
