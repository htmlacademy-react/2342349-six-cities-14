import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import CityList from '../../components/city-list/city-list.tsx';
import Header from '../../components/header/header.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import {MAX_RENT_OFFERS} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCities, getSelectedCity} from '../../store/ui-settings/ui-settings.selectors.ts';
import {getOffers} from '../../store/api-communication/api-communication.selectors.ts';
import {selectCity} from '../../store/ui-settings/ui-settings.slice.ts';

function MainPage() {
  const offers = useAppSelector(getOffers);
  const cities = useAppSelector(getCities);
  const selectedCity = useAppSelector(getSelectedCity);
  const dispatch = useAppDispatch();
  const isOffersEmpty = offers.length === 0;

  const offerList = isOffersEmpty ? (
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
  );

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Sites - Main</title>
      </Helmet>
      <Header/>

      <main className={classNames('page__main', 'page__main--index', {'page__main--index-empty': isOffersEmpty})}>
        <h1 className="visually-hidden">Cities</h1>
        <CityList
          cities={cities}
          selectedCity={selectedCity}
          onSelect={(city) => dispatch(selectCity(city))}
        />
        {offerList}
      </main>
    </div>
  );
}

export default MainPage;
