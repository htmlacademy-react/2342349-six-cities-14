import {Helmet} from 'react-helmet-async';
import CityList from '../../components/city-list/city-list.tsx';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import {MAX_RENT_OFFERS} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectCity} from '../../store/action.ts';

function MainPage() {
  const offers = useAppSelector((state) => state.data.offers);
  const cities = useAppSelector((state) => state.data.cities);
  const selectedCity = useAppSelector((state) => state.data.selectedCity);
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);

  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Sites - Main</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <NavigationMenu
              authorizationStatus={authorizationStatus}
            />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList
          cities={cities}
          selectedCity={selectedCity}
          onSelect={(city) => dispatch(selectCity(city))}
        />

        {offers ? (
          <OfferList
            offers={offers}
            selectedCity={selectedCity}
            maxOfferLimit={MAX_RENT_OFFERS}
          />
        ) : (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {selectedCity.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default MainPage;
