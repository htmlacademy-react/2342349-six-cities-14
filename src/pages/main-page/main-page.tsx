import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import CityList from '../../components/city-list/city-list.tsx';
import Header from '../../components/header/header.tsx';
import OfferListContainer from '../../components/offer-list-container/offer-list-container.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getOffers} from '../../store/api-communication/api-communication.selectors.ts';
import {getCities, getSelectedCity} from '../../store/ui-settings/ui-settings.selectors.ts';
import {selectCity} from '../../store/ui-settings/ui-settings.slice.ts';

function MainPage() {
  const offers = useAppSelector(getOffers);
  const cities = useAppSelector(getCities);
  const selectedCity = useAppSelector(getSelectedCity);
  const dispatch = useAppDispatch();
  const isOffersEmpty = offers.length === 0;

  if (!selectedCity) {
    return;
  }

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
        <OfferListContainer/>
      </main>
    </div>
  );
}

export default MainPage;
