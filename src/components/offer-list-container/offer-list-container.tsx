import {MAX_RENT_OFFERS} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {getOffers} from '../../store/api-communication/api-communication.selectors.ts';
import {getSelectedCity} from '../../store/ui-settings/ui-settings.selectors.ts';
import OfferList from '../offer-list/offer-list.tsx';

function OfferListContainer() {
  const offers = useAppSelector(getOffers);
  const selectedCity = useAppSelector(getSelectedCity);
  const isOffersEmpty = offers.length === 0;

  if (!selectedCity) {
    return;
  }

  return (
    isOffersEmpty ? (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment
                in {selectedCity.name}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    ) : (
      <OfferList
        offers={offers}
        selectedCity={selectedCity}
        maxOfferLimit={MAX_RENT_OFFERS}
      />
    )
  );
}

export default OfferListContainer;
