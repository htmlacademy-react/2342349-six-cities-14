import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import {Offer} from '../../types/offer.ts';


interface MainScreenProps {
  countRentOffer: number;
  offers: Offer[];
}

function MainPage({countRentOffer, offers}: MainScreenProps) {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Sites - Main</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <NavigationMenu />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <OfferList countRentOffer={countRentOffer} offers={offers} />
      </main>
    </div>
  );
}

export default MainPage;
